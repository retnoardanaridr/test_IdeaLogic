const { QueryTypes } = require('sequelize');
const { product, user } = require('../../models');
const db = require('../database/connection');

exports.getProducts = async (req, res) => {
    try {
        const data = await db.sequelize.query('SELECT `product`.`id`, `product`.`name` AS `product_name`, `product`.`idCategory`, `category`.`id` AS `category_id`, `category`.`name` AS `category_name` FROM `products` AS `product` LEFT JOIN `categories` AS `category` ON `product`.`idCategory` = `category`.`id`', {type: QueryTypes.SELECT});

        // const data = await db.sequelize.query("SELECT * FROM products LEFT JOIN users ON products.idUser = users.id", {type: QueryTypes.SELECT });

        res.send({
            status: 'success',
            data,
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // const data = await db.sequelize.query(`SELECT * FROM products WHERE id= ${id}`, { type: QueryTypes.SELECT });
        // const data = await db.sequelize.query(`SELECT * INTO productcategories WHERE categories= ${id}`, { type: QueryTypes.SELECT });

        let data = await product.findOne({
            where: {
              id,
            },
            include: [
              {
                model: user,
                as: 'user',
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'password'],
                },
              },
              {
                model: category,
                as: 'categories',
                through: {
                  model: productCategory,
                  as: 'bridge',
                  attributes: [],
                },
                attributes: {
                  exclude: ['createdAt', 'updatedAt'],
                },
              },
            ],
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'idUser'],
            },
          });

          data = JSON.parse(JSON.stringify(data));

        res.send({
            status: "success",
            data,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server error"
        });
    }
};


exports.addProducts = async (req, res) => {  
    try {
        const name = req.body.name;
        const idCategory = req.body.idCategory;
        const idUser = req.user.id;

        const query = `INSERT INTO products (name, idCategory, idUser) VALUES ('${name}', '${idCategory}', '${idUser}')`;
        await db.sequelize.query(query);

        res.send({
            status: "success",
            message: "Add Product Finished",
        });
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server error',
        })
    }
}