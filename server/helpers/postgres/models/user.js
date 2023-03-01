'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.CounselorSubmission)
      User.hasMany(models.Report)
      User.hasMany(models.Schedule)
      User.hasMany(models.AdminPost)

      User.belongsToMany(models.User, {
        through: models.Schedule,
        as: 'User',
        foreignKey: 'UserId',
      })
      User.belongsToMany(models.User, {
        through: models.Schedule,
        as: 'Counselor',
        foreignKey: 'CounselorId',
      })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'name is required' },
        notEmpty: { msg: 'name is required' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'email must be unique' },
      validate: {
        isEmail: { msg: 'input must be email' },
        notNull: { msg: 'email is required' },
        notEmpty: { msg: 'email is required' }
      }
    },
    gender: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.DATE
    },
    image: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'role is required' },
        notEmpty: { msg: 'role is required' }
      }
    },
    helpful: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'helpful score is required' },
        notEmpty: { msg: 'helpful score is required' }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};