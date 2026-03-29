const express = require('express');
const router = express.Router();
const { validate, validateParams, validateQuery, createPublisherSchema, updatePublisherSchema, publisherIdSchema, publisherQuerySchema } = require('../validators/publisher.validator');

//1 POST   /api/v1/publishers
router.post('/api/v1/publishers', validate(createPublisherSchema), (req, res) => {
    res.send('Create publishers')
});

//2 GET    /api/v1/publishers
router.get('/api/v1/publishers', validateQuery(publisherQuerySchema), (req, res) => {
    //all publishers
    let result = publishers;

    // search by name
    const nameQuery = (req.query.name || '').toLowerCase();
    if (nameQuery) {
        result = result.filter(publisher =>
            publisher.name.toLowerCase().includes(nameQuery)
        );
    }

    // search by country
    const countryQuery = (req.query.country || '').toLowerCase();
    if (countryQuery) {
        result = result.filter(publisher =>
            publisher.country.toLowerCase().includes(countryQuery)
        );
    }

    res.send(result);
});

//3 GET    /api/v1/publishers/:id
router.get('/api/v1/publishers/:id', validateParams(publisherIdSchema), (req, res) => {
    const publisherId = req.params.id;
    res.send(`Details of publisher ${publisherId}`);
})

//4 PUT    /api/v1/publishers/:id
router.put('/api/v1/publishers/:id', validateParams(publisherIdSchema), validate(updatePublisherSchema), (req, res) => {
    const publisherId = req.params.id;
    res.send(`Update publisher ${publisherId}`);
})

//5 DELETE /api/v1/publishers/:id
router.delete('/api/v1/publishers/:id', validateParams(publisherIdSchema), (req, res) => {
    const publisherId = req.params.id;
    res.send(`Delete publisher ${publisherId}`);
})

//6 GET    /api/v1/publishers/:id/books
router.get('/api/v1/publishers/:id/books', (req, res) => {
    const publisherId = req.params.id;
    res.send(`Books of publisher ${publisherId}`);
})
