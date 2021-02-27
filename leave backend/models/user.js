const {Model, DataTypes} = require('sequelize');
const db = require("../config/database");

class User extends Model {
}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM('manager','employee'),
        allowNull: false,
        defaultValue:'manager'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
   email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },   
    
}, {
    sequelize: db,
    modelName: "User"
});

module.exports = User;