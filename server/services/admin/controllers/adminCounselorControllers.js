const { CounselorSubmission } = require('../models/index');

class adminCounselorControllers {
  static async readCounselors(req, res) {
    try {
      const counselors = await CounselorSubmission.findAll();

      res.status(200).json(counselors);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateStatusCounselor(req, res) {
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
      console.log(error, 'error update');
    }
  }

  static async deleteCounselorById(req, res) {
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
        message: 'Success deleted counselor',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = adminCounselorControllers;
