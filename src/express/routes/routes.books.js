const express = require('express');
const router = express.Router();

//POST   /api/v1/books
router.post('/api/v1/books', (req, res) => {
    res.send('Create books')
});

//GET    /api/v1/books
router.get('/api/v1/books', (req, res) => {
    //all books
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

    res.send(result)
});

//GET    /api/v1/books/:id
router.get('/api/v1/books/:id', (req, res) => {
    const bookId = req.params.id;
    res.send(`Details of book ${bookId}`);
})

//PUT    /api/v1/books/:id
router.put('/api/v1/books/:id', (req, res) => {
    const bookId = req.params.id;
    res.send(`Update book ${bookId}`);
})

//DELETE /api/v1/books/:id
router.put('/api/v1/books/:id', (req, res) => {
    const bookId = req.params.id;
    res.send(`Delete book ${bookId}`);
})

//GET    /api/v1/books/:id/reviews
router.get('/api/v1/books/:id/reviews', (req, res) => {
    const bookId = req.params.id;
    res.send(`Reviews of book ${bookId}`);
})

//GET    /api/v1/books/:id/average-rating
router.get('/api/v1/books/:id/average-rating', (req, res) => {
    const bookId = req.params.id;
    res.send(`Average rating of book ${bookId}`);
})