const { Sequelize, Model, DataTypes } = require('sequelize');
pg = require('pg');

module.exports = new Sequelize('leave', 'postgres', 'admin', {
    dialect: 'postgres'
});

