const Sequelize = require('sequelize');


const sequelize = new Sequelize('travels', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//Promise 
sequelize
    .authenticate()
    .then(() => {
        console.log('MySQL connection succesful.');
    })
    .catch(err => {
        console.error('MySQL connection error: ', err);
    });

module.exports = {
    //sequelize: sequelize
    sequelize
};