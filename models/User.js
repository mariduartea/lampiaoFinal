'use strict';
const { Model, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
    'User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        nickname: DataTypes.STRING,
        password: DataTypes.STRING
    },
    {
        sequelize,
        tablaName: "users"
    }
    );

    User.associate = (models) => {

        User.hasMany(models.Post, {as: "posts", foreignKey: "user_id"});
        User.hasMany(models.Notebook, { as:"notebooks", foreignKey: "user_id"});
        User.hasMany(models.Comment, {as:"comments", foreignKey: "user_id"});
    }

    return User;
}