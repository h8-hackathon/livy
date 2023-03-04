const { Report } = require('../models/index');

class adminReportControllers {
  static async readReports(req, res, next) {
    try {
      const reports = await Report.findAll();

      res.status(200).json(reports);
    } catch (error) {
      next(error);
    }
  }

  static async createReport(req, res, next) {
    try {
      const { id, postId, commentId, ReporterId, note } = req.body;

      const newReport = await Report.create({ id, postId, commentId, ReporterId, note });

      res.status(201).json({
        message: 'Success report',
        newReport,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteReportById(req, res, next) {
    try {
      const { id } = req.params;

      const findReport = await Report.findByPk(+id);

      if (!findReport) {
        throw { name: 'NotFound' };
      }

      await Report.destroy({
        where: { id },
      });

      res.status(200).json({
        message: 'Success deleted',
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = adminReportControllers;
