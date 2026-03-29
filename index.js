const express = require('express');
const Fastify = require('fastify');

// Express Server
const expressApp = express();
const expressPort = 3000;

// Import Express routes
const { authorsRoutes, booksRoutes, genreRoutes, publishersRoutes, reviewsRoutes } = require('./src/express/routes');

expressApp.use(express.json());

// Use routes
expressApp.use('/', authorsRoutes);
expressApp.use('/', booksRoutes);
expressApp.use('/', genreRoutes);
expressApp.use('/', publishersRoutes);
expressApp.use('/', reviewsRoutes);

expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});

// Fastify Server
const fastify = Fastify({ logger: true });
const fastifyPort = 3001;

// Import Fastify routes
const { authorsRoute, booksRoute, genreRoute, publishersRoute, reviewsRoute } = require('./src/fastify/routes');

// Register routes
fastify.register(authorsRoute);
fastify.register(booksRoute);
fastify.register(genreRoute);
fastify.register(publishersRoute);
fastify.register(reviewsRoute);

fastify.get('/', async (request, reply) => {
  return { message: 'Hello World!' };
});

// Start both servers
const startServers = async () => {
  try {
    // Start Express
    expressApp.listen(expressPort, () => {
      console.log(`Express server listening at http://localhost:${expressPort}`);
    });

    // Start Fastify
    await fastify.listen({ port: fastifyPort, host: '0.0.0.0' });
    console.log(`Fastify server listening at http://localhost:${fastifyPort}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServers();