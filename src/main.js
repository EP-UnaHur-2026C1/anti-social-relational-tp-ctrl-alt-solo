require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const { syncDatabase } = require('./models');
const errorHandler = require('./middlewares/errorHandler');

// Rutas
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const tagRoutes = require('./routes/tags');
const postImageRoutes = require('./routes/postImages');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
const swaggerDocument = yaml.load(
    fs.readFileSync(path.join(__dirname, '../swagger/swagger.yaml'), 'utf8')
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/post-images', postImageRoutes);

// Ruta de health check
app.get('/', (req, res) => {
    res.json({
        message: '🚀 UnaHur Anti-Social Net API by Ctrl + Alt + Solo',
        docs: `http://localhost:${PORT}/api-docs`,
        version: '1.0.0',
    });
});

// Middleware global de errores (debe ir al final)
app.use(errorHandler);

// Iniciar servidor
const start = async () => {
    await syncDatabase();
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        console.log(`📚 Documentación Swagger en http://localhost:${PORT}/api-docs`);
        console.log(`💾 Base de datos: ${process.env.DB_DIALECT || 'sqlite'}`);
        console.log(`📅 Comentarios visibles hasta: ${process.env.COMMENT_MAX_MONTHS || 6} meses atrás`);
    });
};

start().catch(console.error);
