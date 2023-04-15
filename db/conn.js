const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('insulin_pump', 'root', 'root', {
   host: 'localhost',
   dialect: 'mysql' 
});

try {
    sequelize.authenticate();
    console.log('Connection successfully!');
} catch (err) {
    console.log(`Connection failed, error ${err}`);
}

module.exports = sequelize