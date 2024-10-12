// Import modul yang dibutuhkan
import express from 'express';
import axios from 'axios';
import { load } from 'cheerio'; 
import cors from 'cors';
const app = express();
const PORT = 5000;

app.use(cors());

// MOVIE NEW
app.get('/api/movie-new', async (req, res) => {
    try {
        const { data } = await axios.get('https://tv3.lk21official.my/');
        
        const $ = load(data);
        
        let movies = [];
        
        $('.col-lg-2.col-sm-3.col-xs-4.item').each((index, element) => {
            const title = $(element).find('.caption').text().trim();
            let image = $(element).find('img').attr('src');
            const rating = $(element).find('.rating').text().trim();
            const movieLink = $(element).find('.item-overlay a').attr('href');

            if (image && image.startsWith('//')) {
                image = `https:${image}`;
            }

            movies.push({
                title,
                image,
                rating,
                movieLink
            });
        });

        res.json(movies);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while scraping data.');
    }
});
// MOVIE NEW

// MOVIE POPULAR
app.get('/api/movie-popular', async (req, res) => {
    try {
        const { data } = await axios.get('https://tv3.lk21official.my/');
        const $ = load(data);
        let popularMovies = [];
        
        $('.col-lg-2.col-sm-2.col-xs-4.item').each((index, element) => {
            const title = $(element).find('.grid-title a').text().trim();
            let image = $(element).find('img').attr('src');
            const rating = $(element).find('.rating').text().trim();
            const movieLink = $(element).find('.grid-title a').attr('href');
            const genres = $(element).find('.grid-categories a').map((i, el) => $(el).text()).get();
            
            if (image && image.startsWith('//')) {
                image = `https:${image}`;
            }
            
            popularMovies.push({
                title,
                image,
                rating,
                movieLink,
                genres
            });
        });
        
        res.json(popularMovies);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while scraping data.');
    }
});
// MOVIE POPULAR

// MOVIE HORROR
app.get('/api/movie-horror', async (req, res) => {
    const url = 'https://tv3.lk21official.my/genre/horror/';

    try {
        // Fetch the HTML from the URL
        const { data } = await axios.get(url);
        const $ = load(data);

        // Scrape horror movie details
        const horrorMovies = [];

        // Loop through each movie element
        $('div.col-lg-2.col-sm-3.col-xs-4.page-0.infscroll-item').each((index, element) => {
            const title = $(element).find('h1.grid-title a').text().trim();
            const poster = $(element).find('img').attr('src');
            const rating = $(element).find('div.rating').text().trim();
            const movieLink = $(element).find('h1.grid-title a').attr('href');

            // Prepend "https://" to the poster URL
            const posterUrl = poster.startsWith('http') ? poster : `https:${poster}`;

            // Push the movie details to the array
            horrorMovies.push({
                title,
                poster: posterUrl,
                rating,
                link: movieLink,
            });
        });

        // Send the movie details as the response
        res.json(horrorMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch horror movie details' });
    }
});
// MOVIE HORROR

// MOVIE DETAIL
app.get('/api/movie-details/:movieId', async (req, res) => {
    const { movieId } = req.params;
    const url = `https://tv3.lk21official.my/${movieId}`;

    try {
        // Mengambil halaman
        const { data } = await axios.get(url);
        const $ = load(data);

        // Mengambil data yang diperlukan
        const title = $('header.post-header h2').text();
        const iframeSrc = $('div.embed iframe').attr('src');
        const poster = $('div.content-poster img').attr('src');
        const quality = $('div.content h2').eq(0).next().text();
        const country = $('div.content h2').eq(1).next().text();
        const stars = $('div.content h2').eq(2).next().text();
        const director = $('div.content h2').eq(3).next().text();
        const genres = $('div.content h2').eq(4).next().text();
        const imdbRating = $('div.content h2').eq(5).next().text();
        const released = $('div.content h2').eq(6).next().text();
        const translator = $('div.content h2').eq(7).next().text();
        const synopsis = $('blockquote strong').next().text().trim();
        const videoUrl = $('iframe').attr('src');
        const posterUrl = poster.startsWith('http') ? poster : `https:${poster}`;
        const duration = $('div.content h2').eq(10).next().text();

        // Mengembalikan data dalam format JSON
        res.json({
            title,
            iframeSrc,
            posterUrl,
            videoUrl,
            quality,
            country,
            stars,
            director,
            genres,
            imdbRating,
            released,
            translator,
            synopsis,
            duration
        });
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).json({ error: 'Failed to fetch movie details' });
    }
});
// MOVIE DETAIL

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});