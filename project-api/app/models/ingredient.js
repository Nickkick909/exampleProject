/* jshint indent: 2 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('ingredient', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        measurement: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'ingredient',
        timestamps: true,
    });
};
