module.exports = (sequelize, DataTypes) => {
    
    const Post = sequelize.define(
        'Post', {
            title: DataTypes.STRING,
            text: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
            book_id: DataTypes.INTEGER,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            is_it_public: DataTypes.BOOLEAN
        }, 
        {
            tableName: "posts",
            timestamps: false
        }
    );


    Post.associate = (models) => {
        Post.belongsTo(models.User, {as: "User", foreignKey: "user_id"});
        Post.belongsTo(models.Book, {as: "Book", foreignKey: "book_id"});
        // Post.hasMany(models.Comment, {as: "Comments", foreignKey: "posts_id"})

    }    

    return Post;

}

