// Import modul yang dibutuhkan
import express from 'express';
import axios from 'axios';
import { load } from 'cheerio';  // Menggunakan named import untuk cheerio
import cors from 'cors';
import puppeteer from 'puppeteer';
// Inisialisasi aplikasi Express
const app = express();
const PORT = 5000;

app.use(cors());
app.get('/api/test', async (req, res) => {
    try {
        // Meluncurkan browser dengan Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Mengunjungi halaman
        await page.goto('https://shinigami05.com/', {
            waitUntil: 'networkidle2' // Menunggu hingga jaringan stabil
        });

        // Mengambil data yang diinginkan
        const results = await page.evaluate(() => {
            const items = [];
            const elements = document.querySelectorAll('.col-6.col-sm-6.col-md-6.col-xl-3');

            elements.forEach(element => {
                const title = element.querySelector('.series-title')?.innerText.trim();
                const link = element.querySelector('.series-link')?.href;
                const image = element.querySelector('.thumb-img')?.src;
                const chapters = [];

                element.querySelectorAll('.series-chapter-item').forEach(chapterElement => {
                    const chapterTitle = chapterElement.querySelector('.series-badge')?.innerText.trim();
                    const chapterLink = chapterElement.querySelector('a')?.href;
                    const chapterTime = chapterElement.querySelector('.series-time')?.innerText.trim();
                    chapters.push({ chapterTitle, chapterLink, chapterTime });
                });

                items.push({
                    title,
                    link,
                    image,
                    chapters
                });
            });

            return items;
        });

        // Menutup browser
        await browser.close();

        // Mengirim hasil sebagai respons
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});


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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
