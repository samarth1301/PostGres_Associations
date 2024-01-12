const { DataTypes, literal } = require('sequelize');
const {sequelize} = require('../db');

const Articles = sequelize.define('article',{
    topic: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id:{
        type: DataTypes.UUID,
        defaultValue: literal('gen_random_uuid()'),
        primaryKey: true
    }
})

//no referencing of user here
//but can do that during association and creation

module.exports = {Articles};