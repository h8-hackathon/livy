const { Report } = require('../models/index');

class adminReportControllers {
  static async readReports(req, res) {
    try {
      const reports = await Report.findAll();

      res.status(200).json(reports);
    } catch (error) {
      console.log(error);
    }
  }

  static async createReport(req, res) {
    try {
      const { id, postId, commentId, ReporterId } = req.body;

      const newReport = await Report.create({ id, postId, commentId, ReporterId });

      res.status(201).json({
        message: 'Success report',
        newReport,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteReportById(req, res) {
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
      console.log(error);
    }
  }
}
module.exports = adminReportControllers;
