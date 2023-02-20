/* jshint indent: 2 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('step', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
        },
        order: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        instruction: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'step',
        timestamps: true,
    });
};
