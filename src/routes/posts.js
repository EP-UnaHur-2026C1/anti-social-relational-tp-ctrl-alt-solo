const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { postSchema, postUpdateSchema } = require('../validations/schemas');
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addImageToPost,
  deletePostImage,
  addTagsToPost,
  removeTagFromPost,
} = require('../controllers/posts.controller');

// GET /posts - Listar todos los posts con comentarios filtrados por fecha
router.get('/', getPosts);

// GET /posts/:id - Obtener un post por ID
router.get('/:id', getPostById);

// POST /posts - Crear post
router.post('/', validate(postSchema), createPost);

// PUT /posts/:id - Actualizar post
router.put('/:id', validate(postUpdateSchema), updatePost);

// DELETE /posts/:id - Eliminar post
router.delete('/:id', deletePost);

// POST /posts/:id/images - Agregar imagen a un post
router.post('/:id/images', addImageToPost);

// DELETE /posts/:id/images/:imageId - Eliminar imagen de un post
router.delete('/:id/images/:imageId', deletePostImage);

// POST /posts/:id/tags - Asociar tags a un post
router.post('/:id/tags', addTagsToPost);

// DELETE /posts/:id/tags/:tagId - Desasociar tag de un post
router.delete('/:id/tags/:tagId', removeTagFromPost);

module.exports = router;
