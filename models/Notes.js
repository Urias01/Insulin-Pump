const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const User = require('./User')

const Notes = db.define('notes', {
  notes: {
    type: DataTypes.STRING,
    require: true,
    allowNull: false,
  },
});

Notes.belongsTo(User)
User.hasMany(Notes);

module.exports = Notes;