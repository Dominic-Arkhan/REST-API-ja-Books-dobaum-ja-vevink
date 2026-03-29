const { z } = require('zod');
const { validate, validateParams } = require('../middleware/validation.middleware');

// Creating a genre
const createGenreSchema = z.object({
  name: z.string().min(1, 'Name is required')
});

// Updating a genre
const updateGenreSchema = createGenreSchema.partial();

// Genre ID parameter
const genreIdSchema = z.object({
  id: z.string().min(1)
});

module.exports = {
  createGenreSchema,
  updateGenreSchema,
  genreIdSchema,
  validate,
  validateParams
};