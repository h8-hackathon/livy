'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.User, {
        foreignKey: 'UserId',
        unique: false,
        as: 'User'
      })
      Schedule.belongsTo(models.User, {
        foreignKey: 'CounselorId',
        unique: false,
        as: 'Counselor'
      })
    }
  }
  Schedule.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'status is required' },
        notEmpty: { msg: 'status is required' }
      }
    },
    CounselorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'CounselorId is required' },
        notEmpty: { msg: 'CounselorId is required' }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'UserId is required' },
        notEmpty: { msg: 'UserId is required' }
      }
    },
    session: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'session is required' },
        notEmpty: { msg: 'session is required' }
      }
    },
    note: {
      type: DataTypes.TEXT
    },
    rating: {
      type: DataTypes.INTEGER
    },
    paymentUrl: {
      type: DataTypes.STRING
    },
    expPaymentUrl: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};