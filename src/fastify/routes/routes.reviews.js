const reviewsRoute = async (fastify, options) => {
    //1 POST   /api/v1/books/:bookId/reviews
    fastify.post('/api/v1/books/:bookId/reviews', async (request, reply) => {
        const bookId = request.params.bookId;
        reply.send(`Create review for book ${bookId}`);
    });

    //2 GET    /api/v1/books/:bookId/reviews
    fastify.get('/api/v1/books/:bookId/reviews', async (request, reply) => {
        const bookId = request.params.bookId;

        let result = reviews.filter(review => String(review.bookId) === String(bookId));

        // search by reviewer
        const reviewerQuery = (request.query.reviewer || '').toLowerCase();
        if (reviewerQuery) {
            result = result.filter(review =>
                review.reviewer.toLowerCase().includes(reviewerQuery)
            );
        }

        const sortBy = (request.query.sortBy || '').trim();
        if (sortBy) {
            // error if invalid sort field
            if (sortBy !== 'createdAt') {
                return reply.status(400).send({ error: "Invalid sortBy. Allowed: createdAt" });
            }

            // sort order
            const order = (request.query.order || 'desc').toLowerCase();
            if (order !== 'asc' && order !== 'desc') {
                return reply.status(400).send({ error: "Invalid order. Allowed: asc, desc" });
            }

            // sorting logic
            result = result.slice().sort((a, b) => {
                const aValue = new Date(a[sortBy]).getTime();
                const bValue = new Date(b[sortBy]).getTime();

                if (aValue < bValue) return order === 'asc' ? -1 : 1;
                if (aValue > bValue) return order === 'asc' ? 1 : -1;
                return 0;
            });
        }

        reply.send(result);
    });

    //3 GET    /api/v1/reviews/:id
    fastify.get('/api/v1/reviews/:id', async (request, reply) => {
        const reviewId = request.params.id;
        reply.send(`Details of review ${reviewId}`);
    });

    //4 PUT    /api/v1/reviews/:id
    fastify.put('/api/v1/reviews/:id', async (request, reply) => {
        const reviewId = request.params.id;
        reply.send(`Update review ${reviewId}`);
    });

    //5 DELETE /api/v1/reviews/:id
    fastify.delete('/api/v1/reviews/:id', async (request, reply) => {
        const reviewId = request.params.id;
        reply.send(`Delete review ${reviewId}`);
    });
};

module.exports = reviewsRoute;
