'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trip.belongsTo(models.Country, {
        as: "country",
        foreignKey: {
          name: "idCountry"
        }
      });

      Trip.hasMany(models.Transaction, {
        as: "trip",
        foreignKey: "idTrip"
      });


    }
  };
  Trip.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    tittle: DataTypes.STRING,
    idCountry: {
      as: "country",
      foreignKey: {
        name: "idCountry"
      },
      type: DataTypes.INTEGER,
    },

    accomadation: DataTypes.STRING,
    transportation: DataTypes.STRING,
    eat: DataTypes.STRING,
    day: DataTypes.INTEGER,
    night: DataTypes.INTEGER,
    dateTrip: DataTypes.DATE,
    price: DataTypes.INTEGER,
    quota: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};

