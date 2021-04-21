module.exports = (sequelize, DataTypes) => {
    
    const Post = sequelize.define(
        'Post', {
            title: DataTypes.STRING,
            text: DataTypes.STRING,
            is_it_public: DataTypes.BOOLEAN
        }, 
        {
            sequelize,
            tableName: "posts"
        }
    );


    Post.associate = (models) => {
        Post.belongsTo(models.User, {as: "User", foreignKey: "user_id"});
        Post.belongsTo(models.Book, {as: "Book", foreignKey: "book_id"});
        Post.hasMany(models.Comment, {as: "Comments", foreignKey: "post_id"});

    }    

    return Post;

}

