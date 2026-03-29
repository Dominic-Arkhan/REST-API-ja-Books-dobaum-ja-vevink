const publishersRoute = async (fastify, options) => {
    //1 POST   /api/v1/publishers
    fastify.post('/api/v1/publishers', async (request, reply) => {
        reply.send('Create publishers');
    });

    //2 GET    /api/v1/publishers
    fastify.get('/api/v1/publishers', async (request, reply) => {
        //all publishers
        let result = publishers;

        // search by name
        const nameQuery = (request.query.name || '').toLowerCase();
        if (nameQuery) {
            result = result.filter(publisher =>
                publisher.name.toLowerCase().includes(nameQuery)
            );
        }

        // search by country
        const countryQuery = (request.query.country || '').toLowerCase();
        if (countryQuery) {
            result = result.filter(publisher =>
                publisher.country.toLowerCase().includes(countryQuery)
            );
        }

        reply.send(result);
    });

    //3 GET    /api/v1/publishers/:id
    fastify.get('/api/v1/publishers/:id', async (request, reply) => {
        const publisherId = request.params.id;
        reply.send(`Details of publisher ${publisherId}`);
    });

    //4 PUT    /api/v1/publishers/:id
    fastify.put('/api/v1/publishers/:id', async (request, reply) => {
        const publisherId = request.params.id;
        reply.send(`Update publisher ${publisherId}`);
    });

    //5 DELETE /api/v1/publishers/:id
    fastify.delete('/api/v1/publishers/:id', async (request, reply) => {
        const publisherId = request.params.id;
        reply.send(`Delete publisher ${publisherId}`);
    });

    //6 GET    /api/v1/publishers/:id/books
    fastify.get('/api/v1/publishers/:id/books', async (request, reply) => {
        const publisherId = request.params.id;
        reply.send(`Books of publisher ${publisherId}`);
    });
};

module.exports = publishersRoute;
