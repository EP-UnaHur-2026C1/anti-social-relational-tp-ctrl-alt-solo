require('dotenv').config();
const { User, Post, PostImage, Tag, Comment, syncDatabase } = require('./models');

const seed = async () => {
    await syncDatabase();
    console.log('🌱 Iniciando seed de datos...');

    // Usuarios
    const users = await User.bulkCreate([
        { nickName: 'maria_dev', firstName: 'María', lastName: 'García', email: 'maria@email.com' },
        { nickName: 'juan99', firstName: 'Juan', lastName: 'Pérez', email: 'juan@email.com' },
        { nickName: 'ana_critica', firstName: 'Ana', lastName: 'López', email: 'ana@email.com' },
    ], { ignoreDuplicates: true });

    console.log('✅ Usuarios creados');

    // Tags
    const tags = await Tag.bulkCreate([
        { name: 'tecnologia' },
        { name: 'humor' },
        { name: 'unahur' },
        { name: 'programacion' },
    ], { ignoreDuplicates: true });

    console.log('✅ Tags creados');

    // Posts
    const allUsers = await User.findAll();
    const post1 = await Post.create({
        description: 'Primer día usando Anti-Social Net. Qué red tan peculiar...',
        userId: allUsers[0].id,
    });
    const post2 = await Post.create({
        description: 'Node.js + Sequelize = amor verdadero. Les cuento mi experiencia.',
        userId: allUsers[1].id,
    });
    const post3 = await Post.create({
        description: 'Entregué el TP a último momento como siempre. Tradición universitaria.',
        userId: allUsers[2].id,
    });

    console.log('✅ Posts creados');

    // Imágenes
    await PostImage.bulkCreate([
        { imageUrl: 'https://picsum.photos/800/600?random=1', postId: post1.id },
        { imageUrl: 'https://picsum.photos/800/600?random=2', postId: post2.id },
        { imageUrl: 'https://picsum.photos/800/600?random=3', postId: post2.id },
    ]);

    console.log('✅ Imágenes creadas');

    // Asociar tags a posts
    const allTags = await Tag.findAll();
    await post1.addTags([allTags[0], allTags[1]]);
    await post2.addTags([allTags[0], allTags[3]]);
    await post3.addTags([allTags[1], allTags[2]]);

    console.log('✅ Tags asociados a posts');

    // Comentarios (algunos recientes, algunos viejos para testear el filtro)
    const recentDate = new Date();
    const oldDate = new Date();
    oldDate.setMonth(oldDate.getMonth() - 8); // 8 meses atrás (filtrado)

    await Comment.bulkCreate([
        {
            content: '¡Bienvenida! Esta red es un caos hermoso.',
            postId: post1.id,
            userId: allUsers[1].id,
            commentedAt: recentDate,
        },
        {
            content: 'Totalmente de acuerdo!',
            postId: post1.id,
            userId: allUsers[2].id,
            commentedAt: recentDate,
        },
        {
            content: 'Comentario muy viejo, no debería verse.',
            postId: post1.id,
            userId: allUsers[1].id,
            commentedAt: oldDate,
        },
        {
            content: 'Sequelize es genial, pero las migraciones me enloquecen.',
            postId: post2.id,
            userId: allUsers[0].id,
            commentedAt: recentDate,
        },
        {
            content: 'Clásico de la facultad, jeje.',
            postId: post3.id,
            userId: allUsers[0].id,
            commentedAt: recentDate,
        },
    ]);

    console.log('✅ Comentarios creados');
    console.log('🎉 Seed completado exitosamente!');
    process.exit(0);
};

seed().catch((err) => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
});
