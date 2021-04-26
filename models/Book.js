
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) =>{
    const Book = sequelize.define(
        'Book', {
            name: DataTypes.STRING,
            isbn: DataTypes.STRING,
            publishing_company: DataTypes.STRING,
            writer: DataTypes.STRING,
            genre: DataTypes.STRING,
            n_pages: DataTypes.INTEGER,
            year_publication: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            sequelize,
            tableName: "books"
        }
    );


    Book.associate = (models) => {
        Book.hasMany(models.Post, {as: "posts", foreignKey: "book_id"});

        Book.belongsToMany(models.User, {
            foreignKey: "book_id",
            through: 'notebooks', 
            as: 'users_books'});

        Book.hasMany(models.Notebook, {as: "notebook", foreignKey: "book_id"});
    }

    return Book;
}