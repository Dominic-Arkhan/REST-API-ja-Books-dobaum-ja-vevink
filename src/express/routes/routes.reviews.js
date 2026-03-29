const express = require('express');
const router = express.Router();

//1 POST   /api/v1/books/:bookId/reviews
router.post('/api/v1/books/:bookId/reviews', (req, res) => {
    const bookId = req.params.bookId;
    res.send(`Create review for book ${bookId}`);
});

//2 GET    /api/v1/books/:bookId/reviews
router.get('/api/v1/books/:bookId/reviews', (req, res) => {
    const bookId = req.params.bookId;
    res.send(`List of reviews for book ${bookId}`);
});

//3 GET    /api/v1/reviews/:id
router.get('/api/v1/reviews/:id', (req, res) => {
    const reviewId = req.params.id;
    res.send(`Details of review ${reviewId}`);
})

//4 PUT    /api/v1/reviews/:id
router.put('/api/v1/reviews/:id', (req, res) => {
    const reviewId = req.params.id;
    res.send(`Update review ${reviewId}`);
})

//5 DELETE /api/v1/reviews/:id
router.delete('/api/v1/reviews/:id', (req, res) => {
    const reviewId = req.params.id;
    res.send(`Delete review ${reviewId}`);
})
