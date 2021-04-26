'use strict';
const { Model, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
    'User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        nickname: DataTypes.STRING,
        password: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE       
    },
    {
        sequelize,
        tableName: "users"
    }
    );

    User.associate = (models) => {

        User.hasMany(models.Post, {as: "posts", foreignKey: "user_id"});
        User.belongsToMany(models.Book, {foreignKey: "user_id", through: 'notebooks', as: 'books'});
        User.hasMany(models.Comment, {as:"comments", foreignKey: "user_id"});
        User.hasMany(models.Notebook, {as: "notebook", foreignKey: "user_id"});
    }

    return User;
}