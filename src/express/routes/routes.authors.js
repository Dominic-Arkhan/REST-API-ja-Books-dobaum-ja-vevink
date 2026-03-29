const express = require('express');
const router = express.Router();

//1 POST   /api/v1/authors
router.post('/api/v1/authors', (req, res) => {
    res.send('Create authors')
});

//2 GET    /api/v1/authors
router.get('/api/v1/authors', (req, res) => {
    //all authors
    let result = authors;

    // search by lastName
    const lastNameQuery = (req.query.lastName || '').toLowerCase();
    if (lastNameQuery) {
        result = result.filter(author =>
            author.lastName.toLowerCase().includes(lastNameQuery)
        );
    }

    // search by nationality
    const nationalityQuery = (req.query.nationality || '').toLowerCase();
    if (nationalityQuery) {
        result = result.filter(author =>
            author.nationality.toLowerCase().includes(nationalityQuery)
        );
    }

    res.send(result);
});

//3 GET    /api/v1/authors/:id
router.get('/api/v1/authors/:id', (req, res) => {
    const authorId = req.params.id;
    res.send(`Details of author ${authorId}`);
})

//4 PUT    /api/v1/authors/:id
router.put('/api/v1/authors/:id', (req, res) => {
    const authorId = req.params.id;
    res.send(`Update author ${authorId}`);
})

//5 DELETE /api/v1/authors/:id
router.delete('/api/v1/authors/:id', (req, res) => {
    const authorId = req.params.id;
    res.send(`Delete author ${authorId}`);
})

//6 GET    /api/v1/authors/:id/books
router.get('/api/v1/authors/:id/books', (req, res) => {
    const authorId = req.params.id;
    res.send(`Books of author ${authorId}`);
})
