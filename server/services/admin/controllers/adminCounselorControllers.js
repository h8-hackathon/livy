const { CounselorSubmission } = require('../models/index');

class adminCounselorControllers {
  static async readCounselors(req, res, next) {
    try {
      const counselors = await CounselorSubmission.findAll({
        include: ['User'],
      });

      res.status(200).json(counselors);
    } catch (error) {
      next(error); // Cek ini untuk test gagal
    }
  }

  static async updateStatusCounselor(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      let findCounselor = await CounselorSubmission.findByPk(+id);
      if (!findCounselor) {
        throw { name: 'NotFound' };
      }
      await CounselorSubmission.update({ status }, { where: { id } });

      res.status(200).json({
        message: 'Success updated status counselor',
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCounselorById(req, res, next) {
    try {
      const { id } = req.params;

      const findCounselor = await CounselorSubmission.findByPk(+id);

      if (!findCounselor) {
        throw { name: 'NotFound' };
      }

      await CounselorSubmission.destroy({
        where: { id },
      });

      res.status(200).json({
        message: 'Success deleted status counselor',
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = adminCounselorControllers;
