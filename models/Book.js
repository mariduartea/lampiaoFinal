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
            tableName: "books",
            timestamps: false
        }
    );
    return Book;
}