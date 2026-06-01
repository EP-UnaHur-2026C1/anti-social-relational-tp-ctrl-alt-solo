const { PostImage, Post } = require('../models');

const getPostImages = async (req, res, next) => {
  try {
    const images = await PostImage.findAll({ include: ['post'] });
    res.json(images);
  } catch (err) {
    next(err);
  }
};

const getPostImageById = async (req, res, next) => {
  try {
    const image = await PostImage.findByPk(req.params.id, { include: ['post'] });
    if (!image) return res.status(404).json({ error: 'Imagen no encontrada' });
    res.json(image);
  } catch (err) {
    next(err);
  }
};

const createPostImage = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.body.postId);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    const image = await PostImage.create(req.body);
    res.status(201).json(image);
  } catch (err) {
    next(err);
  }
};

const updatePostImage = async (req, res, next) => {
  try {
    const image = await PostImage.findByPk(req.params.id);
    if (!image) return res.status(404).json({ error: 'Imagen no encontrada' });
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'imageUrl es requerido' });
    await image.update({ imageUrl });
    res.json(image);
  } catch (err) {
    next(err);
  }
};

const deletePostImage = async (req, res, next) => {
  try {
    const image = await PostImage.findByPk(req.params.id);
    if (!image) return res.status(404).json({ error: 'Imagen no encontrada' });
    await image.destroy();
    res.json({ message: 'Imagen eliminada correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPostImages,
  getPostImageById,
  createPostImage,
  updatePostImage,
  deletePostImage,
};
