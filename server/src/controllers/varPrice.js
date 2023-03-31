const db = require('../database/connection');
const { QueryTypes } = require('sequelize');

exports.getPrice = async (req, res) => {
    try {
        // const data = await db.sequelize.query('SELECT `varPrice`.`id`, `varPrice`.`idProduct` AS `product_id`, `varPrice`.`')
        const data = await db.sequelize.query("SELECT * FROM varprices LEFT JOIN products ON varprices.idProduct = products.id", {type: QueryTypes.SELECT });

        res.send({
            status: 'success',
            data,
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server error'
        })
    }
}