'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CounselorSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CounselorSubmission.belongsTo(models.User)
    }
  }
  CounselorSubmission.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'status is required' },
          notEmpty: { msg: 'status is required' },
        },
      },
      submissions: {
        type: DataTypes.TEXT,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'UserId is required' },
          notEmpty: { msg: 'UserId is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'CounselorSubmission',
    }
  )
  return CounselorSubmission
}
