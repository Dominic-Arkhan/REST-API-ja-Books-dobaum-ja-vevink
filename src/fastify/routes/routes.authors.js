const authorsRoute = async (fastify, options) => {
    //1 POST   /api/v1/authors
    fastify.post('/api/v1/authors', async (request, reply) => {
        reply.send('Create authors');
    });

    //2 GET    /api/v1/authors
    fastify.get('/api/v1/authors', async (request, reply) => {
        //all authors
        let result = authors;

        // search by lastName
        const lastNameQuery = (request.query.lastName || '').toLowerCase();
        if (lastNameQuery) {
            result = result.filter(author =>
                author.lastName.toLowerCase().includes(lastNameQuery)
            );
        }

        // search by nationality
        const nationalityQuery = (request.query.nationality || '').toLowerCase();
        if (nationalityQuery) {
            result = result.filter(author =>
                author.nationality.toLowerCase().includes(nationalityQuery)
            );
        }

        reply.send(result);
    });

    //3 GET    /api/v1/authors/:id
    fastify.get('/api/v1/authors/:id', async (request, reply) => {
        const authorId = request.params.id;
        reply.send(`Details of author ${authorId}`);
    });

    //4 PUT    /api/v1/authors/:id
    fastify.put('/api/v1/authors/:id', async (request, reply) => {
        const authorId = request.params.id;
        reply.send(`Update author ${authorId}`);
    });

    //5 DELETE /api/v1/authors/:id
    fastify.delete('/api/v1/authors/:id', async (request, reply) => {
        const authorId = request.params.id;
        reply.send(`Delete author ${authorId}`);
    });

    //6 GET    /api/v1/authors/:id/books
    fastify.get('/api/v1/authors/:id/books', async (request, reply) => {
        const authorId = request.params.id;
        reply.send(`Books of author ${authorId}`);
    });
};

module.exports = authorsRoute;
