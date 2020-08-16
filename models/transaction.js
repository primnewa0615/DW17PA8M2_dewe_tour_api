'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Trip, {
        as: "trip",
        foreignKey: {
          name: "idTrip"
        }
      });
    }
  };
  Transaction.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    counterQty: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING,
    attachment: DataTypes.STRING,
    idTrip: {
      allowNull: false,
      as: "trip",
      model: "Countries",
      foreignKey: {
        name: "idTrip"
      },
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};