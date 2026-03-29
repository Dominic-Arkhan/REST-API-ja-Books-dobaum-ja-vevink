const { z } = require('zod');

// Validation middleware for request body
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.errors
    });
  }
};

// Validation middleware for route parameters
const validateParams = (schema) => (req, res, next) => {
  try {
    schema.parse(req.params);
    next();
  } catch (error) {
    return res.status(400).json({
      error: 'Invalid parameters',
      details: error.errors
    });
  }
};

// Validation middleware for query parameters
const validateQuery = (schema) => (req, res, next) => {
  try {
    schema.parse(req.query);
    next();
  } catch (error) {
    return res.status(400).json({
      error: 'Invalid query parameters',
      details: error.errors
    });
  }
};

module.exports = {
  validate,
  validateParams,
  validateQuery
};