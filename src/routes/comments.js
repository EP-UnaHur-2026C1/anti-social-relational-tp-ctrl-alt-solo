const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { commentSchema, commentUpdateSchema } = require('../validations/schemas');
const {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require('../controllers/comments.controller');

// GET /comments - Listar todos los comentarios
router.get('/', getComments);

// GET /comments/:id - Obtener comentario por ID
router.get('/:id', getCommentById);

// POST /comments - Crear comentario
router.post('/', validate(commentSchema), createComment);

// PUT /comments/:id - Actualizar comentario
router.put('/:id', validate(commentUpdateSchema), updateComment);

// DELETE /comments/:id - Eliminar comentario
router.delete('/:id', deleteComment);

module.exports = router;
