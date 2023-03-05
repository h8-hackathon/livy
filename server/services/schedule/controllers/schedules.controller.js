const { User, Schedule } = require("../models");
const { connect, disconnect, Availability } = require("../mongo");
const { ObjectId } = require("mongodb");
const connectDB = connect();
const { sequelize } = require("../models");
class SchedulesController {
  static async getSchedulesByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const schedules = await Schedule.findAll({
        where: { UserId: userId },
        include: [
          {
            model: User,
            as: "Counselor",
          },
        ],
      });
      res.status(200).json(schedules);
    } catch (error) {
      next(error);
    }
  }

  static async getSchedulesByCounselorId(req, res, next) {
    try {
      const { counselorId } = req.params;
      const schedules = await Schedule.findAll({
        where: { CounselorId: counselorId },
        include: [
          {
            model: User,
            as: "User",
          },
        ],
      });
      res.status(200).json(schedules);
    } catch (error) {
      next(error);
    }
  }

  static async createSchedule(req, res, next) {
    try {
      const { userId } = req.params;
      const { CounselorId, time, note } = req.body;
      await Schedule.create({
        UserId: userId,
        CounselorId,
        time,
        note,
      });
      res.status(201).json({ message: "successfully created" });
    } catch (error) {
      next(error);
    }
  }

  static async updateSchedule(req, res, next) {
    try {
      const { scheduleId } = req.params;
      const { CounselorId, time, note } = req.body;
      await Schedule.update(
        {
          CounselorId,
          time,
          note,
        },
        {
          where: { id: scheduleId },
        }
      );
      res.status(200).json({ message: "successfully updated" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteSchedule(req, res, next) {
    try {
      const { scheduleId } = req.params;
      await Schedule.destroy({
        where: { id: scheduleId },
      });
      res.status(200).json({ message: "successfully deleted" });
    } catch (error) {
      next(error);
    }
  }

  //!  AVAILABILITY
  static async getCounselorAvailability(req, res, next) {
    try {
      const { counselorId } = req.params;
      const result = await Availability.findAll({
        _id: new ObjectId(counselorId),
      }).toArray();
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
    } catch (error) {
      next(error);
    }
  }
  static async createCounselorAvailability(req, res, next) {
    try {
      const result = await Availability.insertOne(req.body);
      res.status(200).json({ message: "successfully created" });
    } catch (error) {
      next(error);
    }
  }
  static async updateCounselorAvailability(req, res, next) {
    try {
      const { counselorId } = req.params;
      let result = await Availability.updateOne(
        { _id: new ObjectId(counselorId) },
        { $set: req.body }
      );
      if (result) {
        res.status(200).json({
          message: "successfully updated",
        });
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
    } catch (error) {
      next(error);
    }
  }
  static async deleteCounselorAvailability(req, res, next) {
    try {
      const { counselorId } = req.params;
      let result = await Availability.deleteOne({ _id: new ObjectId(counselorId) });
      if (result.deletedCount === 1) {
        res.status(200).json({
          message: "successfully deleted",
        });
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SchedulesController;
