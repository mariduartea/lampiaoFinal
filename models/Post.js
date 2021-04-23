module.exports = (sequelize, DataTypes) => {
    
    const Post = sequelize.define(
        'Post', {
            title: DataTypes.STRING,
            text: DataTypes.STRING,
            is_it_public: DataTypes.BOOLEAN,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        }, 
        {
            sequelize,
            tableName: "posts"
        }
    );


    Post.associate = (models) => {
        Post.belongsTo(models.User, {as: "user", foreignKey: "user_id"});
        Post.belongsTo(models.Book, {as: "book", foreignKey: "book_id"});
        Post.hasMany(models.Comment, {as: "comments", foreignKey: "post_id"});

    }    

    return Post;

}

