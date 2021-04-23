module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        'Comment', {
        title: DataTypes.STRING,
        text: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        tableName: "comments",
    }
    )
    Comment.associate = (models) => {
        Comment.belongsTo(models.Post,{as:"comment",foreignKey:"post_id"});
        Comment.belongsTo(models.User,{as:"user",foreignKey:"user_id"});
    }


    return Comment;
}