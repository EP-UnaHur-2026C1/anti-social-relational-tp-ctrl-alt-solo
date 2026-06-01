const { Op } = require('sequelize');
const { Post, User, PostImage, Tag } = require('../models');

const getCommentDateLimit = () => {
  const months = parseInt(process.env.COMMENT_MAX_MONTHS) || 6;
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date;
};

const getPosts = async (req, res, next) => {
  try {
    const dateLimit = getCommentDateLimit();
    const posts = await Post.findAll({
      include: [
        { association: 'author', attributes: ['id', 'nickName', 'firstName', 'lastName'] },
        { association: 'images' },
        { association: 'tags' },
        {
          association: 'comments',
          where: { commentedAt: { [Op.gte]: dateLimit } },
          required: false,
          include: [{ association: 'author', attributes: ['id', 'nickName'] }],
        },
      ],
      order: [['publishedAt', 'DESC']],
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const dateLimit = getCommentDateLimit();
    const post = await Post.findByPk(req.params.id, {
      include: [
        { association: 'author', attributes: ['id', 'nickName', 'firstName', 'lastName'] },
        { association: 'images' },
        { association: 'tags' },
        {
          association: 'comments',
          where: { commentedAt: { [Op.gte]: dateLimit } },
          required: false,
          include: [{ association: 'author', attributes: ['id', 'nickName'] }],
          order: [['commentedAt', 'DESC']],
        },
      ],
    });
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    await post.update(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    await post.destroy();
    res.json({ message: 'Post eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};

const addImageToPost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'imageUrl es obligatorio' });
    const image = await PostImage.create({ imageUrl, postId: post.id });
    res.status(201).json(image);
  } catch (err) {
    next(err);
  }
};

const deletePostImage = async (req, res, next) => {
  try {
    const image = await PostImage.findOne({
      where: { id: req.params.imageId, postId: req.params.id },
    });
    if (!image) return res.status(404).json({ error: 'Imagen no encontrada' });
    await image.destroy();
    res.json({ message: 'Imagen eliminada correctamente' });
  } catch (err) {
    next(err);
  }
};

const addTagsToPost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    const { tagIds } = req.body;
    if (!tagIds || !Array.isArray(tagIds))
      return res.status(400).json({ error: 'tagIds debe ser un array de IDs' });
    const tags = await Tag.findAll({ where: { id: tagIds } });
    await post.addTags(tags);
    const updated = await Post.findByPk(post.id, { include: ['tags'] });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const removeTagFromPost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    const tag = await Tag.findByPk(req.params.tagId);
    if (!post || !tag) return res.status(404).json({ error: 'Post o tag no encontrado' });
    await post.removeTag(tag);
    res.json({ message: 'Tag desasociado del post' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addImageToPost,
  deletePostImage,
  addTagsToPost,
  removeTagFromPost,
};
