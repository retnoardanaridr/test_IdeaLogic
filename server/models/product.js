'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.user, {
        as: 'user',
        foreignKey: {
          name: 'idUser',
        }
      });
      
      product.belongsToMany(models.category, {
        as: 'categories',
        through: {
          model: 'productCategory',
          as: 'bridge',
        },
        foreignKey: 'idProduct',
      });
    }
  }
  product.init({
    name: DataTypes.STRING,
    idCategory: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};