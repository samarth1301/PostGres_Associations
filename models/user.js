const { DataTypes, literal } = require('sequelize');
const {sequelize} = require('../db');
const { Articles } = require('./articles');
const { Movies } = require('./movies');

const User = sequelize.define('user',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id:{
        type: DataTypes.UUID,
        defaultValue: literal('gen_random_uuid()'),
        primaryKey: true
    }
})

// 1:M association

User.hasMany(Articles,{
    foreignKey:{
        name:"userId"
    }
});
Articles.belongsTo(User);



//M:N association
//foreign key is the foreign key to the through table
User.belongsToMany(Movies,{ foreignKey:'userId',through:"acting"});
Movies.belongsToMany(User,{ foreignKey:"movieId", through:"acting"}) 

module.exports = User;