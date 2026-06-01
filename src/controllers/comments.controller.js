const { Comment, User, Post } = require('../models');

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { association: 'author', attributes: ['id', 'nickName'] },
        { association: 'post', attributes: ['id', 'description'] },
      ],
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: ['author', 'post'],
    });
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' });
    res.json(comment);
  } catch (err) {
    next(err);
  }
};

const createComment = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.body.postId);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    const user = await User.findByPk(req.body.userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' });
    await comment.update(req.body);
    res.json(comment);
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' });
    await comment.destroy();
    res.json({ message: 'Comentario eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
