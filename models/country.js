'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Country.hasMany(models.Trip, {
        as: "country",
        foreignKey: { name: "idCountry" }
      })
    }
  };
  Country.init({
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};

////////////////////////////////////////////////////////////////////////////////////////////
