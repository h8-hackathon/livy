'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Report.belongsTo(models.User)
    }
  }
  Report.init({
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'postId is required' },
        notEmpty: { msg: 'postId is required' }
      }
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'commentId is required' },
        notEmpty: { msg: 'commentId is required' }
      }
    },
    ReporterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'ReportedId is required' },
        notEmpty: { msg: 'ReportedId is required' }
      }
    },
    note: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};