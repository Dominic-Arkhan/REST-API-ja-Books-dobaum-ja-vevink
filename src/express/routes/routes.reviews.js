const express = require('express');
const router = express.Router();
const { validate, validateParams, validateQuery, createReviewSchema, updateReviewSchema, reviewIdSchema, bookIdSchema, reviewQuerySchema } = require('../validators/review.validator');

//1 POST   /api/v1/books/:bookId/reviews
router.post('/api/v1/books/:bookId/reviews', validateParams(bookIdSchema), validate(createReviewSchema), (req, res) => {
    const bookId = req.params.bookId;
    res.send(`Create review for book ${bookId}`);
});

//2 GET    /api/v1/books/:bookId/reviews
router.get('/api/v1/books/:bookId/reviews', validateParams(bookIdSchema), validateQuery(reviewQuerySchema), (req, res) => {
    const bookId = req.params.bookId;

    let result = reviews.filter(review => String(review.bookId) === String(bookId));

    // search by reviewer
    const reviewerQuery = (req.query.reviewer || '').toLowerCase();
    if (reviewerQuery) {
        result = result.filter(review =>
            review.reviewer.toLowerCase().includes(reviewerQuery)
        );
    }

    const sortBy = (req.query.sortBy || '').trim();
    if (sortBy) {
        // error if invalid sort field
        if (sortBy !== 'createdAt') {
            return res.status(400).json({ error: "Invalid sortBy. Allowed: createdAt" });
        }

        // sort order
        const order = (req.query.order || 'desc').toLowerCase();
        if (order !== 'asc' && order !== 'desc') {
            return res.status(400).json({ error: "Invalid order. Allowed: asc, desc" });
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

    res.json(result);
});

//3 GET    /api/v1/reviews/:id
router.get('/api/v1/reviews/:id', validateParams(reviewIdSchema), (req, res) => {
    const reviewId = req.params.id;
    res.send(`Details of review ${reviewId}`);
})

//4 PUT    /api/v1/reviews/:id
router.put('/api/v1/reviews/:id', validateParams(reviewIdSchema), validate(updateReviewSchema), (req, res) => {
    const reviewId = req.params.id;
    res.send(`Update review ${reviewId}`);
})

//5 DELETE /api/v1/reviews/:id
router.delete('/api/v1/reviews/:id', validateParams(reviewIdSchema), (req, res) => {
    const reviewId = req.params.id;
    res.send(`Delete review ${reviewId}`);
})
