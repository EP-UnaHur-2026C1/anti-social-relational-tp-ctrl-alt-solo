const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { tagSchema } = require('../validations/schemas');
const {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} = require('../controllers/tags.controller');

// GET /tags - Listar todos los tags
router.get('/', getTags);

// GET /tags/:id - Obtener tag con sus posts
router.get('/:id', getTagById);

// POST /tags - Crear tag
router.post('/', validate(tagSchema), createTag);

// PUT /tags/:id - Actualizar tag
router.put('/:id', validate(tagSchema), updateTag);

// DELETE /tags/:id - Eliminar tag
router.delete('/:id', deleteTag);

module.exports = router;
