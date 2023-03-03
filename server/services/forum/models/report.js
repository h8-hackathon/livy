'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Report.belongsTo(models.User, {
        foreignKey: 'ReporterId',
      })
    }
  }
  Report.init(
    {
      postId: {
        type: DataTypes.STRING,
        allowNull: true,
     
      },
      commentId: {
        type: DataTypes.STRING,
        allowNull: true,
      
      },
      ReporterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'ReportedId is required' },
          notEmpty: { msg: 'ReportedId is required' },
        },
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      note: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Report',
    }
  )
  return Report
}
