const { z } = require('zod');
const { validate, validateParams, validateQuery } = require('../middleware/validation.middleware');

// Creating an author
const createAuthorSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  birthYear: z.number().int().min(0).max(new Date().getFullYear()),
  nationality: z.string().min(2),
  biography: z.string().optional()
});

// Updating an author
const updateAuthorSchema = createAuthorSchema.partial();

// Author ID parameter
const authorIdSchema = z.object({
  id: z.string().min(1)
});

// Query parameters
const authorQuerySchema = z.object({
  lastName: z.string().optional(),
  nationality: z.string().optional()
});

module.exports = {
  createAuthorSchema,
  updateAuthorSchema,
  authorIdSchema,
  authorQuerySchema,
  validate,
  validateParams,
  validateQuery
};