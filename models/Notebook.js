const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Notebook = sequelize.define(
        'Notebook', {
            grade: DataTypes.INTEGER,
            status: DataTypes.STRING,
            favorite: DataTypes.BOOLEAN
        }, 
        {
            sequelize,
            tableName: "notebooks"
        }
    );
    

    Notebook.associate = (models) => {
        //realação 1:N (um livro pode ter vários notebooks
        //1 livro temm vários notebooks
        //1 notebook só pertence a 1 livro)
        Notebook.belongsTo(models.Book, { as: "book", foreignKey: "book_id"});

        Notebook.belongsTo(models.User, { as: "user", foreignKey: "user_id"});        
    }

    return Notebook;

}