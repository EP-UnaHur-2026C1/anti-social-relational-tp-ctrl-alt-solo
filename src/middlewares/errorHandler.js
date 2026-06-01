// Middleware global de manejo de errores
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            error: 'Conflicto',
            message: 'Ya existe un registro con ese valor único',
            fields: err.errors.map((e) => e.path),
        });
    }

    if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({
            error: 'Error de integridad referencial',
            message: 'El recurso referenciado no existe',
        });
    }

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            details: err.errors.map((e) => e.message),
        });
    }

    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor',
    });
};

module.exports = errorHandler;
