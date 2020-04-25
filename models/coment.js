// Importar librería Sequelize
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

// Importar conexión a base de datos
const { sequelize } = require('./../config/db');

// Crear modelo
class Coment extends Model {}
Coment.init({
    //Definir campos del modelo
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    addcoment: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'coment'
});

// Exportar modelo
module.exports = { Coment };