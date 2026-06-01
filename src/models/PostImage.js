const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const PostImage = sequelize.define('PostImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'posts',
      key: 'id',
    },
  },
}, {
  tableName: 'post_images',
  timestamps: true,
});

module.exports = PostImage;
