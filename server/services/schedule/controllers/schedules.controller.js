const { User, Schedule } = require('../models')

class SchedulesController {
  static async getSchedulesByUserId(req, res, next) {
    try {
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
    try {
      const { userId } = req.params
      const { CounselorId, time, note } = req.body
      await Schedule.create({
        UserId: userId,
        CounselorId,
        time,
        note,
      })
      res.status(201).json({ message: 'successfully created' })
    } catch (error) {
      next(error)
    }
  }

  static async updateSchedule(req, res, next) {
    try {
      const { scheduleId } = req.params
      const { CounselorId, time, note } = req.body
      await Schedule.update(
        {
          CounselorId,
          time,
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
  }
}

module.exports = SchedulesController
