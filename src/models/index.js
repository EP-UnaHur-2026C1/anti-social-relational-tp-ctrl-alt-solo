const sequelize = require('../config/sequelize');
const User = require('./User');
const Post = require('./Post');
const PostImage = require('./PostImage');
const Tag = require('./Tag');
const Comment = require('./Comment');

// User -> Post (1:N)
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// Post -> PostImage (1:N)
Post.hasMany(PostImage, { foreignKey: 'postId', as: 'images', onDelete: 'CASCADE' });
PostImage.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

// Post -> Comment (1:N)
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

// User -> Comment (1:N)
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// Post <-> Tag (N:M)
Post.belongsToMany(Tag, { through: 'PostTags', as: 'tags' });
Tag.belongsToMany(Post, { through: 'PostTags', as: 'posts' });

// BONUS: User <-> User (N:M) para Followers
User.belongsToMany(User, {
  through: 'Followers',
  as: 'following',
  foreignKey: 'followerId',
  otherKey: 'followingId',
});
User.belongsToMany(User, {
  through: 'Followers',
  as: 'followers',
  foreignKey: 'followingId',
  otherKey: 'followerId',
});

const syncDatabase = async () => {
  await sequelize.sync({ alter: true });
  console.log('✅ Base de datos sincronizada');
};

module.exports = { sequelize, User, Post, PostImage, Tag, Comment, syncDatabase };
