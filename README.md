# Moverse API

Moverse is an API that utilizes web scraping techniques to obtain movie data

### TechStack
- **Express.js**
- **Cheerio**
- **Axios**


### Base URL

`https://moverse-api.vercel.app/api/$endpoint`


### Endpoint List

### 1. Movie List
- **GET** `/movie-list`
  
  Retrieve a list of movies.
  
  **Example:**  
  `https://moverse-api.vercel.app/api/movie-list`

### 2. New Movies
- **GET** `/movie-new`
  
  Retrieve a list of the latest movies.
  
  **Example:**  
  `https://moverse-api.vercel.app/api/movie-new`

### 3. Popular Movies
- **GET** `/movie-popular`
  
  Retrieve a list of currently popular movies.
  
  **Example:**  
  `https://moverse-api.vercel.app/api/movie-popular`

### 4. Movie Genres
- **GET** `/genres`
  
  Retrieve a list of movie genres.
  
  **Example:**  
  `https://moverse-api.vercel.app/api/genres`

### 5. Movies by Genre
- **GET** `/movie-genre/:genreId`
  
  Retrieve a list of movies based on genre.
  
  **Example:**  
  `https://moverse-api.vercel.app/api/movie-genre/action`

### 6. Popular Horror Movies
- **GET** `/movie-horror`
  
  Retrieve a list of popular horror movies.
  
  **Example:**  
  `https://moverse-api.vercel.app/api/movie-horror`

### 7. Popular Drama Movies
- **GET** `/movie-drama`
  
  Retrieve a list of popular drama movies.
  
  **Example:**  
  `https://moverse-api.vercel.app/api/movie-drama`

### 8. Movie Details
- **GET** `/movie-details/:movieId`
  
  Retrieve details of a movie, including the streaming URL.
  
  **Example:**  
  `https://moverse-api.vercel.app/api/movie-details/pengabdi-setan-2`

### 9. Movie Search
- **GET** `/movie-search/:searchId`
  
  Retrieve a list of movies based on search query.
  
  **Example:**  
  `https://moverse-api.vercel.app/api/movie-search/mortal%20kombat`




