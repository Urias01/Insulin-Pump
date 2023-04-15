const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
    },
});

module.exports = User;