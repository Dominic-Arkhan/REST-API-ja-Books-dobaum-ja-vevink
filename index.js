const express = require('express');
const app = express();
const port = 3000;

// Import routes
const { authorsRoutes, booksRoutes, genreRoutes, publishersRoutes, reviewsRoutes } = require('./src/express/routes');

app.use(express.json());

// Use routes
app.use('/', authorsRoutes);
app.use('/', booksRoutes);
app.use('/', genreRoutes);
app.use('/', publishersRoutes);
app.use('/', reviewsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});