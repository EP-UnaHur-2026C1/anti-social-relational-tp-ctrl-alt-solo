const { User, Post, Comment } = require('../models');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                { association: 'posts', include: ['images', 'tags'] },
            ],
        });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch (err) {
        next(err);
    }
}

const getUserByNickName = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { nickName: req.params.nickName } });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch (err) {
        next(err);
    }
}

const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        await user.update(req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        await user.destroy();
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        next(err);
    }
}

const followUser = async (req, res, next) => {
    try {
        const follower = await User.findByPk(req.params.id);
        const target = await User.findByPk(req.params.targetId);
        if (!follower || !target) return res.status(404).json({ error: 'Usuario no encontrado' });
        if (req.params.id === req.params.targetId)
            return res.status(400).json({ error: 'Un usuario no puede seguirse a sí mismo' });
        await follower.addFollowing(target);
        res.json({ message: `${follower.nickName} ahora sigue a ${target.nickName}` });
    } catch (err) {
        next(err);
    }
}

const unfollowUser = async (req, res, next) => {
    try {
        const follower = await User.findByPk(req.params.id);
        const target = await User.findByPk(req.params.targetId);
        if (!follower || !target) return res.status(404).json({ error: 'Usuario no encontrado' });
        await follower.removeFollowing(target);
        res.json({ message: `${follower.nickName} dejó de seguir a ${target.nickName}` });
    } catch (err) {
        next(err);
    }
}

const getFollowers = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                { association: 'followers', attributes: ['id', 'nickName', 'firstName', 'lastName'] },
                { association: 'following', attributes: ['id', 'nickName', 'firstName', 'lastName'] },
            ],
        });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ followers: user.followers, following: user.following });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUsers,
    getUserById,
    getUserByNickName,
    createUser,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser,
    getFollowers
};