const express = require('express');
const router = express.Router();

//POST   /api/v1/books
router.post('/api/v1/books', (req, res) => {
    res.send('Create books')
});

//GET    /api/v1/books
router.get('/api/v1/books', (req, res) => {
    res.send('List of books')
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