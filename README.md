# REST-API-ja-Books-dobaum-ja-vevink

selgelt kirjeldatud endpoint'ide loetelu koos näidispäringute ja vastustega


## SETUP Guide

1. Clone repo
   - `git clone https://github.com/Dominic-Arkhan/REST-API-ja-Books-dobaum-ja-vevink.git`
2. Install dependencies
   - `npm install`
3. Start server
   - `npm start` (listens on `http://localhost:3000`)

## All Endpoints

### Books
- `POST /api/v1/books`
- `GET /api/v1/books`
  - query filters: `title`, `author`, `genre`, `language`, `year`, `publisher`
  - sort: `sortBy` (`title`, `author`, `genre`, `language`, `publishedYear`, `publisher`, `year`), `order` (`asc`, `desc`)
  - pagination: `page`, `limit`
- `GET /api/v1/books/:id`
- `PUT /api/v1/books/:id`
- `DELETE /api/v1/books/:id`
- `GET /api/v1/books/:id/reviews`
- `GET /api/v1/books/:id/average-rating`

### Authors
- `POST /api/v1/authors`
- `GET /api/v1/authors`
  - query filters: `lastName`, `nationality`
- `GET /api/v1/authors/:id`
- `PUT /api/v1/authors/:id`
- `DELETE /api/v1/authors/:id`
- `GET /api/v1/authors/:id/books`

### Genres
- `GET /api/v1/genres`
- `POST /api/v1/genres`
- `GET /api/v1/genres/:id`
- `GET /api/v1/genres/:id/books`

### Publishers
- `POST /api/v1/publishers`
- `GET /api/v1/publishers`
  - query filters: `name`, `country`
- `GET /api/v1/publishers/:id`
- `PUT /api/v1/publishers/:id`
- `DELETE /api/v1/publishers/:id`
- `GET /api/v1/publishers/:id/books`

### Reviews
- `POST /api/v1/books/:bookId/reviews`
- `GET /api/v1/books/:bookId/reviews`
  - query filters: `reviewer`
  - sort: `sortBy=createdAt`, `order=asc|desc`
- `GET /api/v1/reviews/:id`
- `PUT /api/v1/reviews/:id`
- `DELETE /api/v1/reviews/:id`

### Possible errors
- `400 Bad Request` for invalid query/value (`sortBy`, `order`)
- `500 Internal Server Error` if sample data collections are unavailable
- `404 Not Found` for missing resource IDs (not yet implemented but expected)

### Query parameters
- `GET /api/v1/books?sortBy=title&order=asc`
- `GET /api/v1/books?sortBy=publishedYear&order=desc`
- `GET /api/v1/books?page=1&limit=10`
- `GET /api/v1/books/1/reviews?sortBy=createdAt&order=desc`

## Examples for use
### Request body examples
- Create author:
  ```json
  { "firstName": "Jaan", "lastName": "Tamm", "nationality": "EE" }
  ```
- Create book:
  ```json
  { "title": "Eesti seiklus", "author": "Jaan Tamm", "genre": "Ilukirjandus", "year": 2025 }
  ```

### Response examples
- `GET /api/v1/books`:
  ```json
  [
    { "id": "1", "title": "Eesti seiklus", "author": "Jaan Tamm" }
  ]
  ```
- `GET /api/v1/books?sortBy=title&order=asc`:
  ```json
  [
    { "id": "1", "title": "Eesti seiklus", "author": "Jaan Tamm" },
    { "id": "2", "title": "Õhtu meri", "author": "Mari Maasikas" }
  ]
  ```
- `GET /api/v1/books?page=1&limit=10`:
  ```json
  {
    "page": 1,
    "limit": 10,
    "totalItems": 30,
    "totalPages": 3,
    "data": [ ... ]
  }
  ```
- `GET /api/v1/books/1/reviews?sortBy=createdAt&order=desc`:
  ```json
  [
    { "id": "2", "bookId": "1", "createdAt": "2024-05-15T09:20:00Z", "text": "Väga hea raamat" }
  ]
  ```


