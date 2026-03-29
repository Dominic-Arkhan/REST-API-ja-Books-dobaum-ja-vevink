const express = require('express');
const router = express.Router();
const { validate, validateParams, createGenreSchema, updateGenreSchema, genreIdSchema } = require('../validators/genre.validator');

//1 GET    /api/v1/genres
router.get('/api/v1/genres', (req, res) => {
    res.send('List of genres');
});

//2 POST   /api/v1/genres
router.post('/api/v1/genres', validate(createGenreSchema), (req, res) => {
    res.send('Create genre');
});

//3 GET    /api/v1/genres/:id
router.get('/api/v1/genres/:id', validateParams(genreIdSchema), (req, res) => {
    const genreId = req.params.id;
    res.send(`Details of genre ${genreId}`);
});

//4 GET    /api/v1/genres/:id/books
router.get('/api/v1/genres/:id/books', validateParams(genreIdSchema), (req, res) => {
    const genreId = req.params.id;
    res.send(`Books of genre ${genreId}`);
})
