const express = require('express');
const router = express.Router();

//1 POST   /api/v1/publishers
router.post('/api/v1/publishers', (req, res) => {
    res.send('Create publishers')
});

//2 GET    /api/v1/publishers
router.get('/api/v1/publishers', (req, res) => {
    res.send('List of publishers')
});

//3 GET    /api/v1/publishers/:id
router.get('/api/v1/publishers/:id', (req, res) => {
    const publisherId = req.params.id;
    res.send(`Details of publisher ${publisherId}`);
})

//4 PUT    /api/v1/publishers/:id
router.put('/api/v1/publishers/:id', (req, res) => {
    const publisherId = req.params.id;
    res.send(`Update publisher ${publisherId}`);
})

//5 DELETE /api/v1/publishers/:id
router.delete('/api/v1/publishers/:id', (req, res) => {
    const publisherId = req.params.id;
    res.send(`Delete publisher ${publisherId}`);
})

//6 GET    /api/v1/publishers/:id/books
router.get('/api/v1/publishers/:id/books', (req, res) => {
    const publisherId = req.params.id;
    res.send(`Books of publisher ${publisherId}`);
})
