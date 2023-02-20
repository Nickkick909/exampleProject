/* jshint indent: 2 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('recipe', {
        id: {
            autoIncrement: true,
            type: DataTypes.DOUBLE,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        cookTime: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        prepTime: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'recipe',
        timestamps: true,
    });
};
