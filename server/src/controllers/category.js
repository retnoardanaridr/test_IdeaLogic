const { QueryTypes } = require('sequelize')
const db = require('../database/connection');

exports.addCategory = async (req, res) => {
    try {
        const name = req.body.name;

        await db.sequelize.query(`INSERT INTO categories (name) VALUES ('${name}')`);
        res.send({
            status: 'success',
            message: 'Add category is finished'
        });
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server error'
        });
    }
}

exports.getCategories = async (req, res) => {
    try {
        const data = await db.sequelize.query("SELECT * FROM categories", { type: QueryTypes.SELECT });
        
        res.send({
            status: 'success',
            data,
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server error',
        })
    }
}

exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await db.sequelize.query(`SELECT * FROM categories WHERE id = ${id}`, { type: QueryTypes.SELECT });

        res.send({
            status: "success",
            data,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server error'
        })
    }
}