const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');
const validate = require('../middlewares/validate');
const { userSchema, userUpdateSchema } = require('../validations/schemas');
const {
    getUsers,
    getUserById,
    getUserByNickName,
    createUser,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser,
    getFollowers
} = require('../controllers/users.controller.js');



// GET /users - Listar todos los usuarios
router.get('/', getUsers);

// GET /users/:id - Obtener un usuario por ID
router.get('/:id', getUserById);

// GET /users/nickname/:nickName - Obtener usuario por nickName
router.get('/nickname/:nickName', getUserByNickName);

// POST /users - Crear usuario
router.post('/', validate(userSchema), createUser);

// PUT /users/:id - Actualizar usuario
router.put('/:id', validate(userUpdateSchema), updateUser);

// DELETE /users/:id - Eliminar usuario
router.delete('/:id', deleteUser);

// POST /users/:id/follow/:targetId - Seguir a otro usuario (BONUS)
router.post('/:id/follow/:targetId', followUser);

// DELETE /users/:id/follow/:targetId - Dejar de seguir (BONUS)
router.delete('/:id/follow/:targetId', unfollowUser);

// GET /users/:id/followers - Ver seguidores (BONUS)
router.get('/:id/followers', getFollowers);

module.exports = router;
