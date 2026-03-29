const { z } = require('zod');
const { validate, validateParams, validateQuery } = require('../middleware/validation.middleware');

// Creating a publisher
const createPublisherSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  country: z.string().min(2),
  foundedYear: z.number().int().min(1000).max(new Date().getFullYear()),
  website: z.string().url().optional()
});

// Updating a publisher
const updatePublisherSchema = createPublisherSchema.partial();

// Publisher ID parameter
const publisherIdSchema = z.object({
  id: z.string().min(1)
});

// Query parameters
const publisherQuerySchema = z.object({
  name: z.string().optional(),
  country: z.string().optional()
});

module.exports = {
  createPublisherSchema,
  updatePublisherSchema,
  publisherIdSchema,
  publisherQuerySchema,
  validate,
  validateParams,
  validateQuery
};