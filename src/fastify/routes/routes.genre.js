const genreRoute = async (fastify, options) => {
    //1 GET    /api/v1/genres
    fastify.get('/api/v1/genres', async (request, reply) => {
        reply.send('List of genres');
    });

    //2 POST   /api/v1/genres
    fastify.post('/api/v1/genres', async (request, reply) => {
        reply.send('Create genre');
    });

    //3 GET    /api/v1/genres/:id
    fastify.get('/api/v1/genres/:id', async (request, reply) => {
        const genreId = request.params.id;
        reply.send(`Details of genre ${genreId}`);
    });

    //4 GET    /api/v1/genres/:id/books
    fastify.get('/api/v1/genres/:id/books', async (request, reply) => {
        const genreId = request.params.id;
        reply.send(`Books of genre ${genreId}`);
    });
};

module.exports = genreRoute;
