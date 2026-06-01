const { Tag } = require('../models');

const getTags = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (err) {
    next(err);
  }
};

const getTagById = async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ association: 'posts', include: ['author'] }],
    });
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
    res.json(tag);
  } catch (err) {
    next(err);
  }
};

const createTag = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    next(err);
  }
};

const updateTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
    await tag.update(req.body);
    res.json(tag);
  } catch (err) {
    next(err);
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
    await tag.destroy();
    res.json({ message: 'Tag eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};
