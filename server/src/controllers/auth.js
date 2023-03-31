const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../../models')

const db = require('../database/connection');


exports.register = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().min(2).required(),
        password: Joi.string().min(3).required(),
        role: Joi.string().min(2).required(),
    });

    const { error } = schema.validate(req.body)

    if (error)
        return res.status(400).send({
            error: {
                message: error
            },
        });

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const email = req.body.email;
        const name = req.body.name;
        const password = hashedPassword;
        const role = req.body.role;

        const newUser = await db.sequelize.query(`INSERT INTO users (email, password, name, role) VALUES ('${email}', '${password}', '${name}', '${role}')`);

        const SECRET_KEY = 'bolehapaaja'
        const token = jwt.sign({ id: newUser.id }, SECRET_KEY)

        res.status(200).send({
            status: 'success register',
            data: {
                name: name,
                email: email,
                token,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Server error'
        })
    }
}

exports.login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().min(2).required(),
        password: Joi.string().min(3).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
        return res.status(400).send({
            error: {
                message: error.details[0].message,
            },
        });

    try {
        const userExist = await user.findOne({
            where: {
                email: req.body.email,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        const isValid = await bcrypt.compare(req.body.password, userExist.password);

        if (!isValid) {
            return res.status(400).send({
                status: "failed",
                message: "credential is invalid",
            });
        }

        // generate token
        const SECRET_KEY = 'rahasia'
        const token = jwt.sign({ id: userExist.id }, SECRET_KEY)

        res.status(200).send({
            status: "success login",
            data: {
                id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                status: userExist.status,
                token,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server error'
        })
    }
}

exports.checkAuth = async (req, res) => {
    try {
        const id = req.user.id;

        const dataUser = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
            },
        });

        if (!dataUser) {
            return res.status(404).send({
                status: 'failed',
            });
        }

        res.send({
            status: 'success',
            data: {
                user: {
                    id: dataUser.id,
                    name: dataUser.name,
                    email: dataUser.email,
                    status: dataUser.status,
                },
            },
        });
    } catch (error) {
        console.log(error);
        res.status({
            status: 'failed',
            message: 'Server error',
        })
    }
}