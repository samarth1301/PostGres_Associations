const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('test', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres' 
});
module.exports = {sequelize};