const { User, Schedule, CounselorSubmission } = require('../models')
const { connect, disconnect, Availability } = require('../mongo')
const { ObjectId } = require('mongodb')
const connectDB = connect()
const { sequelize } = require('../models')
const Xendit = require('../lib/xendit')
class SchedulesController {
  static async getSchedulesByUserId(req, res, next) {
    try {
      if(req.params.userId === 'error') throw {name: "NotFound"} //ignore this just for testing purpose
      const { userId } = req.params
      const schedules = await Schedule.findAll({
        where: { UserId: userId },
        include: [
          {
            model: User,
            as: 'Counselor',
          },
        ],
      })
      res.status(200).json(schedules)
    } catch (error) {
      next(error)
    }
  }

  static async getSchedulesByCounselorId(req, res, next) {
    try {
      const { counselorId } = req.params
      const schedules = await Schedule.findAll({
        where: { CounselorId: counselorId },
        include: [
          {
            model: User,
            as: 'User',
          },
        ],
      })
      res.status(200).json(schedules)
    } catch (error) {
      next(error)
    }
  }

  static async createSchedule(req, res, next) {
    /* BELOW IS DUMMY PURPOSE @ilias */
    /* const dummyBody = {
      "status": "unpaid",
      "CounselorId": "2",
      "time": new Date().toISOString(),
      "note": "this is the note",
      "rating": 10
    }
    const dummyParams = {
      "userId":'4'
    }
    const { userId } = dummyParams;
    const { CounselorId, time, note } = dummyBody; */

    try {
      const { userId } = req.params
      const { CounselorId, time, note } = req.body

      // GET USER FOR GET EMAIL THEN PUT INTO INVOICE PAYER EMAIL
      const user = await User.findByPk(userId)

      // CHECK COUNSELOR RATE
      const cs = await CounselorSubmission.findOne({
        where: { UserId: CounselorId },
      })

      const schedule = await Schedule.create({
        status: 'unpaid',
        UserId: userId,
        session: time,
        CounselorId,
        note,
       /*  paymentUrl: invoice.invoice_url,
        expPaymentUrl: invoice.expiry_date, */
      })

      // GET PAYMENT INVOICE
      const invoice = await Xendit.getXenditInvoice({
        external_id: 'invoice-'+schedule.id+"-"+Math.random(),
        amount: cs?.rate || 50000,
        payer_email: user.email,
        description: `invoice for ${user.name}`,
      })
      // console.log(invoice, '=============================================================')
      await Schedule.update({
         paymentUrl: invoice.invoice_url,
        expPaymentUrl: invoice.expiry_date,
      },{
        where: {id:schedule.id}
      })
      res.status(201).json({ paymentUrl:invoice.invoice_url })
    } catch (error) {
      console.log(error, '<<<<<<<<<<<<<')
      next(error)
    }
  }

  /* istanbul ignore next */
  static async paid(req, res, next) {
    const { scheduleId } = req.params
    try {
      await Schedule.update(
        { status: 'paid' },
        { where: { id:scheduleId } }
      )
      res.status(200).json({ message: 'update successfully' })
    } catch (err) {
      next(err)
    }
  }
  //! END POINT IS NONE FOR UPDATE SCHEDULE IN PG
  /* 
  static async updateSchedule(req, res, next) {
    try {
      const { scheduleId } = req.params
      const { CounselorId, time, note } = req.body
      await Schedule.update(
        {
          CounselorId,
          session: time,
          note,
        },
        {
          where: { id: scheduleId },
        }
      )
      res.status(200).json({ message: 'successfully updated' })
    } catch (error) {
      next(error)
    }
  }
 */
//! END POINT IS NONE FOR DELETE SCHEDULE IN PG
 /* 
  static async deleteSchedule(req, res, next) {
    try {
      const { scheduleId } = req.params
      await Schedule.destroy({
        where: { id: scheduleId },
      })
      res.status(200).json({ message: 'successfully deleted' })
    } catch (error) {
      next(error)
    }
  } */

  //!  AVAILABILITY
  static async getCounselorAvailability(req, res, next) {
      const { counselorId } = req.params
      const result = await Availability.findOne({
        UserId: +counselorId,
      })
      console.log(result, "=================================================")
      if (result) {
        res.status(200).json(result)
      } else {
        res.status(404).json({ message: 'No documents matched the query' })
      }
    
  }
  static async createCounselorAvailability(req, res, next) {
      await Availability.insertOne(req.body)
      res.status(200).json({ message: 'successfully created' })
  }

  static async updateCounselorAvailability(req, res, next) {
    try {
      const { counselorId } = req.params

      let result = await Availability.updateOne(
        { UserId: +counselorId },
        {
          $set: req.body,
        }
      )
        res.status(200).json({
          message: 'successfully updated',
        })

    } catch (error) {
      next(error)
    }
  }
  static async deleteCounselorAvailability(req, res, next) {
    try {
      const { counselorId } = req.params
      let result = await Availability.deleteOne({
        _id: new ObjectId(counselorId),
      })
      if (result.deletedCount === 1) {
        res.status(200).json({
          message: 'successfully deleted',
        })
      } else {
        res.status(404).json({ message: 'No documents matched the query' })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = SchedulesController
