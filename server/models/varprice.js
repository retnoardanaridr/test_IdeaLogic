'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class varPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      varPrice.belongsTo(models.product, {
        as: 'product',
        foreignKey: {
          name: 'idProduct',
        }
      })
    }
  }
  varPrice.init({
    idProduct: DataTypes.INTEGER,
    range: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'varPrice',
  });
  return varPrice;
};