const Sequelize = require('sequelize');
const db = {}
const sequelize = new Sequelize('railway', 'root', '', {
    host: "containers-us-west-120.railway.app",
    port: "6814",
    dialect: "mysql",
    logging: console.log,
    freezeTableName: true,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

db.sequelize = sequelize;

module.exports = db;