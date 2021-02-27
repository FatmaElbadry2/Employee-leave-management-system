const {Model, DataTypes} = require('sequelize');
const db = require("../config/database");

class Request extends Model {
}

Request.init({
   status: {
        type: DataTypes.ENUM('pending','accepted','rejected'),
        allowNull: false,
        defaultValue:'pending'
    },
    reason: {
        type: DataTypes.ENUM('Casual leave','medical leave','maternity leave','holiday'),
        allowNull: false
    },
    additionaldetails:{
        type: DataTypes.STRING,
        allowNull: true
    },
   startdate:{
        type: DataTypes.DATEONLY,
        allowNull:false,
    },
    enddate:{
        type: DataTypes.DATEONLY,
        allowNull:false,
    },   
    
}, {
    sequelize: db,
    modelName: "Request"
});

module.exports = Request;