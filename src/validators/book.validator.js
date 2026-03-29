const { z } = require('zod');
const { validate, validateParams, validateQuery } = require('../middleware/validation.middleware');

// Creating a book
const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  isbn: z.string().min(10, 'ISBN must be at least 10 characters'),
  publishedYear: z.number().int().min(1000).max(new Date().getFullYear()),
  pageCount: z.number().int().positive(),
  language: z.string().min(2),
  description: z.string().min(1),
  coverImage: z.string().url().optional(),
  authorId: z.string().min(1),
  publisherId: z.string().min(1),
  genres: z.array(z.string()).min(1)
});

// Updating a book
const updateBookSchema = createBookSchema.partial();

// Book ID parameter
const bookIdSchema = z.object({
  id: z.string().min(1)
});

// Query parameters
const bookQuerySchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  genre: z.string().optional(),
  language: z.string().optional(),
  year: z.string().regex(/^\d+$/).optional(),
  publisher: z.string().optional(),
  sortBy: z.enum(['title', 'author', 'genre', 'language', 'year', 'publisher', 'publishedYear']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z.string().regex(/^\d+$/).optional(),
  limit: z.string().regex(/^\d+$/).optional()
});

module.exports = {
  createBookSchema,
  updateBookSchema,
  bookIdSchema,
  bookQuerySchema,
  validate,
  validateParams,
  validateQuery
};