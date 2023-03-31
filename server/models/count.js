'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class count extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  count.init({
    idCategory: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'count',
  });
  return count;
};