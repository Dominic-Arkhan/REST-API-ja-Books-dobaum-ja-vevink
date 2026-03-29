const { PrismaClient } = require('@prisma/client');
const { mockAuthors, mockPublishers, mockGenres, mockBooks, mockReviews } = require('../src/models/mockData');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.bookGenre.deleteMany();
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.author.deleteMany();
  await prisma.publisher.deleteMany();

  for (const author of mockAuthors) {
    await prisma.author.create({
      data: {
        id: author.id,
        firstName: author.firstName,
        lastName: author.lastName,
        birthYear: author.birthYear,
        nationality: author.nationality,
        biography: author.biography || null,
        createdAt: new Date(author.createdAt),
      },
    });
  }

  for (const publisher of mockPublishers) {
    await prisma.publisher.create({
      data: {
        id: publisher.id,
        name: publisher.name,
        country: publisher.country,
        foundedYear: publisher.foundedYear,
        website: publisher.website || null,
        createdAt: new Date(publisher.createdAt),
      },
    });
  }

  for (const genre of mockGenres) {
    await prisma.genre.create({
      data: {
        id: genre.id,
        name: genre.name,
      },
    });
  }

  for (const book of mockBooks) {
    await prisma.book.create({
      data: {
        id: book.id,
        title: book.title,
        isbn: book.isbn,
        publishedYear: book.publishedYear,
        pageCount: book.pageCount,
        language: book.language,
        description: book.description,
        coverImage: book.coverImage || null,
        createdAt: new Date(book.createdAt),
        updatedAt: new Date(book.updatedAt),
        author: { connect: { id: book.authorId } },
        publisher: { connect: { id: book.publisherId } },
        bookGenres: {
          create: book.genres.map((genreName) => ({
            genre: { connect: { name: genreName } },
          })),
        },
      },
    });
  }

  for (const review of mockReviews) {
    await prisma.review.create({
      data: {
        id: review.id,
        book: { connect: { id: review.bookId } },
        userName: review.userName,
        rating: review.rating,
        comment: review.comment,
        createdAt: new Date(review.createdAt),
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
