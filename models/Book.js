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
            year_publication: DataTypes.INTEGER
        },
        {
            sequelize,
            tableName: "books"
        }
    );


    Book.associate = (models) => {
        Book.hasMany(models.Post, {as: "Posts", foreignKey: "book_id"});

        Book.hasMany(models.Notebook, { as:"notebooks", foreignKey: "book_id"})
    }

    return Book;
}