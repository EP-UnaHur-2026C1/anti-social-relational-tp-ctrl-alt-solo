const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { postImageSchema } = require('../validations/schemas');
const {
  getPostImages,
  getPostImageById,
  createPostImage,
  updatePostImage,
  deletePostImage,
} = require('../controllers/postImages.controller');

// GET /post-images - Listar todas las imágenes
router.get('/', getPostImages);

// GET /post-images/:id - Obtener imagen por ID
router.get('/:id', getPostImageById);

// POST /post-images - Crear imagen
router.post('/', validate(postImageSchema), createPostImage);

// PUT /post-images/:id - Actualizar URL de imagen
router.put('/:id', updatePostImage);

// DELETE /post-images/:id - Eliminar imagen
router.delete('/:id', deletePostImage);

module.exports = router;
