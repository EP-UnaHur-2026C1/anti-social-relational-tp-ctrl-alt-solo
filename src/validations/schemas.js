const Joi = require('joi');

const userSchema = Joi.object({
    nickName: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'El nickName no puede estar vacío',
        'string.min': 'El nickName debe tener al menos 3 caracteres',
        'any.required': 'El nickName es obligatorio',
    }),
    firstName: Joi.string().min(2).max(50).required().messages({
        'any.required': 'El nombre es obligatorio',
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
        'any.required': 'El apellido es obligatorio',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'El email no tiene un formato válido',
        'any.required': 'El email es obligatorio',
    }),
});

const userUpdateSchema = Joi.object({
    nickName: Joi.string().min(3).max(30),
    firstName: Joi.string().min(2).max(50),
    lastName: Joi.string().min(2).max(50),
    email: Joi.string().email(),
}).min(1);

const postSchema = Joi.object({
    description: Joi.string().min(1).required().messages({
        'string.empty': 'La descripción no puede estar vacía',
        'any.required': 'La descripción es obligatoria',
    }),
    userId: Joi.number().integer().positive().required().messages({
        'any.required': 'El userId es obligatorio',
    }),
    publishedAt: Joi.date().iso(),
});

const postUpdateSchema = Joi.object({
    description: Joi.string().min(1),
    publishedAt: Joi.date().iso(),
}).min(1);

const postImageSchema = Joi.object({
    imageUrl: Joi.string().uri().required().messages({
        'string.uri': 'La URL de la imagen no es válida',
        'any.required': 'La URL de la imagen es obligatoria',
    }),
    postId: Joi.number().integer().positive().required(),
});

const tagSchema = Joi.object({
    name: Joi.string().min(1).max(50).required().messages({
        'string.empty': 'El nombre del tag no puede estar vacío',
        'any.required': 'El nombre del tag es obligatorio',
    }),
});

const commentSchema = Joi.object({
    content: Joi.string().min(1).required().messages({
        'string.empty': 'El contenido del comentario no puede estar vacío',
        'any.required': 'El contenido del comentario es obligatorio',
    }),
    postId: Joi.number().integer().positive().required().messages({
        'any.required': 'El postId es obligatorio',
    }),
    userId: Joi.number().integer().positive().required().messages({
        'any.required': 'El userId es obligatorio',
    }),
    commentedAt: Joi.date().iso(),
});

const commentUpdateSchema = Joi.object({
    content: Joi.string().min(1),
    isVisible: Joi.boolean(),
}).min(1);

module.exports = {
    userSchema,
    userUpdateSchema,
    postSchema,
    postUpdateSchema,
    postImageSchema,
    tagSchema,
    commentSchema,
    commentUpdateSchema,
};
