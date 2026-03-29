const express = require('express');
const router = express.Router();
const { validate, validateParams, validateQuery, createBookSchema, updateBookSchema, bookIdSchema, bookQuerySchema } = require('../validators/book.validator');

//POST   /api/v1/books
router.post('/api/v1/books', validate(createBookSchema), (req, res) => {
    res.send('Create books')
});

//GET    /api/v1/books
router.get('/api/v1/books', validateQuery(bookQuerySchema), (req, res) => {
    //all books
    if (!Array.isArray(books)) {
        return res.status(500).json({ error: 'Books data source is not configured' });
    }

    let result = books;
    
    // search by title
    const titleQuery = (req.query.title || '').toLowerCase();
    if (titleQuery) {
        result = result.filter(book =>
            book.title.toLowerCase().includes(titleQuery)
        );
    }
    
    // search by author
    const authorQuery = (req.query.author || '').toLowerCase();
    if (authorQuery) {
        result = result.filter(book =>
            book.author.toLowerCase().includes(authorQuery)
        );
    }

    //search by genre
    const genreQuery = (req.query.genre || '').toLowerCase();
    if (genreQuery) {
        result = result.filter(book =>
            book.genre.toLowerCase().includes(genreQuery)
        );
    }

    //search by language
    const languageQuery = (req.query.language || '').toLowerCase();
    if (languageQuery) {
        result = result.filter(book =>
            book.language.toLowerCase().includes(languageQuery)
        );
    }

    //seach by year
    const yearQuery = parseInt(req.query.year);
    if (yearQuery) {
        result = result.filter(book =>
            book.year === yearQuery
        );
    }

    //search by publisher
    const publisherQuery = (req.query.publisher || '').toLowerCase();
    if (publisherQuery) {
        result = result.filter(book =>
            book.publisher.toLowerCase().includes(publisherQuery)
        );
    }

    // sort by field
    const rawSortBy = (req.query.sortBy || '').trim();
    if (rawSortBy) {
        var sortBy = rawSortBy === 'publishedYear' ? 'year' : rawSortBy;
        var validSortFields = ['title', 'author', 'genre', 'language', 'year', 'publisher'];

        // error if invalid sort field
        if (validSortFields.indexOf(sortBy) === -1) {
            return res.status(400).json({ error: "Invalid sortBy. Allowed: title, author, genre, language, year, publisher, publishedYear" });
        }

        // sort order
        var order = (req.query.order || 'asc').toLowerCase();
        if (order !== 'asc' && order !== 'desc') {
            return res.status(400).json({ error: "Invalid order. Use 'asc' or 'desc'" });
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
    var page = parseInt(req.query.page, 10);
    var limit = parseInt(req.query.limit, 10);

    var usePagination = !Number.isNaN(page) || !Number.isNaN(limit);

    if (usePagination) {
        if (Number.isNaN(page) || page < 1) page = 1;
        if (Number.isNaN(limit) || limit < 1) limit = 10;

        var totalItems = result.length;
        var totalPages = Math.ceil(totalItems / limit);
        var offset = (page - 1) * limit;
        var pagedResult = result.slice(offset, offset + limit);

        return res.json({
            page: page,
            limit: limit,
            totalItems: totalItems,
            totalPages: totalPages,
            data: pagedResult
        });
    }

    res.json(result);
});

//GET    /api/v1/books/:id
router.get('/api/v1/books/:id', validateParams(bookIdSchema), (req, res) => {
    const bookId = req.params.id;
    res.send(`Details of book ${bookId}`);
})

//PUT    /api/v1/books/:id
router.put('/api/v1/books/:id', validateParams(bookIdSchema), validate(updateBookSchema), (req, res) => {
    const bookId = req.params.id;
    res.send(`Update book ${bookId}`);
})

//DELETE /api/v1/books/:id
router.delete('/api/v1/books/:id', validateParams(bookIdSchema), (req, res) => {
    const bookId = req.params.id;
    res.send(`Delete book ${bookId}`);
})

//GET    /api/v1/books/:id/reviews
router.get('/api/v1/books/:id/reviews', validateParams(bookIdSchema), (req, res) => {
    const bookId = req.params.id;
    res.send(`Reviews of book ${bookId}`);
})

//GET    /api/v1/books/:id/average-rating
router.get('/api/v1/books/:id/average-rating', validateParams(bookIdSchema), (req, res) => {
    const bookId = req.params.id;
    res.send(`Average rating of book ${bookId}`);
})