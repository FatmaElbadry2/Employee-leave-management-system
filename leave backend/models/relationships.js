const Users = require("./user");
const Managers =  require("./user");
const Requests = require("./requests");
const db = require("../config/database");
const {Model, DataTypes,Sequelize} = require('sequelize');

Users.hasMany(Requests);
Requests.belongsTo(Users);

Users.belongsTo(Managers);
Managers.hasMany(Users);