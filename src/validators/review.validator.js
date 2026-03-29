const { z } = require('zod');
const { validate, validateParams, validateQuery } = require('../middleware/validation.middleware');

// Creating a review
const createReviewSchema = z.object({
  bookId: z.string().min(1),
  userName: z.string().min(1, 'User name is required'),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1)
});

// Updating a review
const updateReviewSchema = createReviewSchema.partial();

// Review ID parameter
const reviewIdSchema = z.object({
  id: z.string().min(1)
});

// Book ID parameter
const bookIdSchema = z.object({
  bookId: z.string().min(1)
});

// Query parameters
const reviewQuerySchema = z.object({
  reviewer: z.string().optional(),
  sortBy: z.enum(['createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional()
});

module.exports = {
  createReviewSchema,
  updateReviewSchema,
  reviewIdSchema,
  bookIdSchema,
  reviewQuerySchema,
  validate,
  validateParams,
  validateQuery
};