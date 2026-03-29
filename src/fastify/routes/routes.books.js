const booksRoute = async (fastify, options) => {
    //POST   /api/v1/books
    fastify.post('/api/v1/books', async (request, reply) => {
        reply.send('Create books');
    });

    //GET    /api/v1/books
    fastify.get('/api/v1/books', async (request, reply) => {
        //all books
        if (!Array.isArray(books)) {
            return reply.status(500).send({ error: 'Books data source is not configured' });
        }

        let result = books;
        
        // search by title
        const titleQuery = (request.query.title || '').toLowerCase();
        if (titleQuery) {
            result = result.filter(book =>
                book.title.toLowerCase().includes(titleQuery)
            );
        }
        
        // search by author
        const authorQuery = (request.query.author || '').toLowerCase();
        if (authorQuery) {
            result = result.filter(book =>
                book.author.toLowerCase().includes(authorQuery)
            );
        }

        //search by genre
        const genreQuery = (request.query.genre || '').toLowerCase();
        if (genreQuery) {
            result = result.filter(book =>
                book.genre.toLowerCase().includes(genreQuery)
            );
        }

        //search by language
        const languageQuery = (request.query.language || '').toLowerCase();
        if (languageQuery) {
            result = result.filter(book =>
                book.language.toLowerCase().includes(languageQuery)
            );
        }

        //search by year
        const yearQuery = parseInt(request.query.year);
        if (yearQuery) {
            result = result.filter(book =>
                book.year === yearQuery
            );
        }

        //search by publisher
        const publisherQuery = (request.query.publisher || '').toLowerCase();
        if (publisherQuery) {
            result = result.filter(book =>
                book.publisher.toLowerCase().includes(publisherQuery)
            );
        }

        // sort by field
        const rawSortBy = (request.query.sortBy || '').trim();
        if (rawSortBy) {
            var sortBy = rawSortBy === 'publishedYear' ? 'year' : rawSortBy;
            var validSortFields = ['title', 'author', 'genre', 'language', 'year', 'publisher'];

            // error if invalid sort field
            if (validSortFields.indexOf(sortBy) === -1) {
                return reply.status(400).send({ error: "Invalid sortBy. Allowed: title, author, genre, language, year, publisher, publishedYear" });
            }

            // sort order
            var order = (request.query.order || 'asc').toLowerCase();
            if (order !== 'asc' && order !== 'desc') {
                return reply.status(400).send({ error: "Invalid order. Use 'asc' or 'desc'" });
            }

            // sorting logic
            result = result.slice().sort(function (a, b) {
                var aValue = a[sortBy];
                var bValue = b[sortBy];

                if (aValue == null) aValue = '';
                if (bValue == null) bValue = '';

                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                }
                if (typeof bValue === 'string') {
                    bValue = bValue.toLowerCase();
                }

                if (aValue < bValue) return order === 'asc' ? -1 : 1;
                if (aValue > bValue) return order === 'asc' ? 1 : -1;
                return 0;
            });
        }

        // pagination support
        var page = parseInt(request.query.page, 10);
        var limit = parseInt(request.query.limit, 10);

        var usePagination = !Number.isNaN(page) || !Number.isNaN(limit);

        if (usePagination) {
            if (Number.isNaN(page) || page < 1) page = 1;
            if (Number.isNaN(limit) || limit < 1) limit = 10;

            var totalItems = result.length;
            var totalPages = Math.ceil(totalItems / limit);
            var offset = (page - 1) * limit;
            var pagedResult = result.slice(offset, offset + limit);

            return reply.send({
                page: page,
                limit: limit,
                totalItems: totalItems,
                totalPages: totalPages,
                data: pagedResult
            });
        }

        reply.send(result);
    });

    //GET    /api/v1/books/:id
    fastify.get('/api/v1/books/:id', async (request, reply) => {
        const bookId = request.params.id;
        reply.send(`Details of book ${bookId}`);
    });

    //PUT    /api/v1/books/:id
    fastify.put('/api/v1/books/:id', async (request, reply) => {
        const bookId = request.params.id;
        reply.send(`Update book ${bookId}`);
    });

    //DELETE /api/v1/books/:id
    fastify.delete('/api/v1/books/:id', async (request, reply) => {
        const bookId = request.params.id;
        reply.send(`Delete book ${bookId}`);
    });

    //GET    /api/v1/books/:id/reviews
    fastify.get('/api/v1/books/:id/reviews', async (request, reply) => {
        const bookId = request.params.id;
        reply.send(`Reviews of book ${bookId}`);
    });

    //GET    /api/v1/books/:id/average-rating
    fastify.get('/api/v1/books/:id/average-rating', async (request, reply) => {
        const bookId = request.params.id;
        reply.send(`Average rating of book ${bookId}`);
    });
};

module.exports = booksRoute;
