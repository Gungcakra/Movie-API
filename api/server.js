// Import modul yang dibutuhkan
import express from 'express';
import axios from 'axios';
import { load } from 'cheerio'; 
import cors from 'cors';
const app = express();
const PORT = 3000;
app.use(cors());



app.get('/api/movie-list', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.sweetteagrille.com/');
    
    const $ = load(data);
    
    const movies = [];
    $('div.col-md-125[itemscope="itemscope"]').each((index, element) => {
      const title = $(element).find('h2.entry-title a').text();
      const permalink = $(element).find('h2.entry-title a').attr('href');
      const imageUrl = $(element).find('img').attr('srcset');

      const srcsetArray = imageUrl.split(',').map(item => item.trim());
      const largestImage = srcsetArray[srcsetArray.length - 1].split(' ')[0];
      const image = largestImage;
   
      const rating = $(element).find('div.gmr-rating-item').text().trim();
      const releaseDate = $(element).find('time').attr('datetime');
      const director = $(element).find('span[itemprop="director"] span[itemprop="name"] a').text();
      const quality = $(element).find('div.gmr-quality-item a').text();

      movies.push({
        title,
        permalink,
        image,
        rating,
        releaseDate,
        director,
        quality
      });
    });

    res.json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching data');
  }
});


// MOVIE NEW
app.get('/api/movie-new', async (req, res) => {
    try {
      const url = 'https://www.sweetteagrille.com/';
      const { data } = await axios.get(url);
      
      const $ = load(data);
      const movieList = [];

      $('article.item-infinite').each((i, el) => {
        const title = $(el).find('h2.entry-title a').text().trim();
        const link = $(el).find('h2.entry-title a').attr('href');
        const imageUrl = $(el).find('div.content-thumbnail a img').attr('srcset');
        const srcsetArray = imageUrl.split(',').map(item => item.trim());
        const largestImage = srcsetArray[srcsetArray.length - 1].split(' ')[0];
        const image = largestImage;
        const rating = $(el).find('div.gmr-rating-item').text().trim();
        const duration = $(el).find('div.gmr-duration-item').text().trim();
        const genre = $(el).find('div.gmr-movie-on').text().trim();
        const releaseDate = $(el).find('time[itemprop="dateCreated"]').attr('datetime');
        const trailer = $(el).find('a.gmr-trailer-popup').attr('href');
        
        movieList.push({
          title,
          link,
          image,
          rating,
          duration,
          genre,
          releaseDate,
          trailer
        });
      });
  
      res.json(movieList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching movie data' });
    }
  });
  
// MOVIE NEW

// MOVIE POPULAR
app.get('/api/movie-popular', async (req, res) => {
    try {
      const { data } = await axios.get('https://www.sweetteagrille.com/');
      const $ = load(data);
  
      let movies = [];
  
      $('.idmuvi-rp ul li').each((index, element) => {
        const movieTitle = $(element).find('.idmuvi-rp-title').text().trim();
        const movieLink = $(element).find('a').attr('href');
        const imageUrl = $(element).find('img').attr('srcset');
        const srcsetArray = imageUrl.split(',').map(item => item.trim());
        const largestImage = srcsetArray[srcsetArray.length - 1].split(' ')[0];
        const movieImage = largestImage;
        const movieCategory = $(element).find('.idmuvi-rp-meta a[rel="category tag"]').map((i, el) => $(el).text()).get().join(', ');
        const movieCountry = $(element).find('.idmuvi-rp-meta [itemtype="http://schema.org/Place"] a').text();
  
        movies.push({
          title: movieTitle,
          link: movieLink,
          image: movieImage,
          category: movieCategory,
          country: movieCountry,
        });
      });
  
      res.json({
        status: 'success',
        data: movies,
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });
  
// MOVIE POPULAR

// MOVIE HORROR
app.get('/api/movie-horror', async (req, res) => {
    try {
      const url = 'https://www.sweetteagrille.com/film-horror-terbaru/';
      const { data } = await axios.get(url);
      const $ = load(data);
  
      const movies = [];
  
      $('article.item-infinite').each((index, element) => {
        const title = $(element).find('h2.entry-title a').text();
        const link = $(element).find('h2.entry-title a').attr('href');
        const imageUrl = $(element).find('img').attr('srcset');
        const srcsetArray = imageUrl.split(',').map(item => item.trim());
        const largestImage = srcsetArray[srcsetArray.length - 1].split(' ')[0];
        const image = largestImage;
        const rating = $(element).find('.gmr-rating-item').text().trim();
        const duration = $(element).find('.gmr-duration-item').text().trim();
        const quality = $(element).find('.gmr-quality-item a').text().trim();
        const releaseDate = $(element).find('time').attr('datetime');
        const categories = [];
  
        $(element)
          .find('.gmr-movie-on a')
          .each((i, el) => {
            categories.push($(el).text().trim());
          });
  
        movies.push({
          title,
          link,
          image,
          rating,
          duration,
          quality,
          releaseDate,
          categories,
        });
      });
  
      res.json(movies);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });
// MOVIE HORROR

// MOVIE ROMANCE
app.get('/api/movie-romance', async (req, res) => {
    try {
      const url = 'https://www.sweetteagrille.com/romance/';
      const { data } = await axios.get(url);
      const $ = load(data);
  
      const movies = [];
  
      $('article.item-infinite').each((index, element) => {
        const title = $(element).find('h2.entry-title a').text();
        const link = $(element).find('h2.entry-title a').attr('href');
        const imageUrl = $(element).find('img').attr('srcset');
        const srcsetArray = imageUrl.split(',').map(item => item.trim());
        const largestImage = srcsetArray[srcsetArray.length - 1].split(' ')[0];
        const image = largestImage;
        const rating = $(element).find('.gmr-rating-item').text().trim();
        const duration = $(element).find('.gmr-duration-item').text().trim();
        const quality = $(element).find('.gmr-quality-item a').text().trim();
        const releaseDate = $(element).find('time').attr('datetime');
        const categories = [];
  
        $(element)
          .find('.gmr-movie-on a')
          .each((i, el) => {
            categories.push($(el).text().trim());
          });
  
        movies.push({
          title,
          link,
          image,
          rating,
          duration,
          quality,
          releaseDate,
          categories,
        });
      });
  
      res.json(movies);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });
// MOVIE ROMANCE

// MOVIE ROMANCE
app.get('/api/movie-korea', async (req, res) => {
    try {
      const url = 'https://www.sweetteagrille.com/nonton-drama-korea/';
      const { data } = await axios.get(url);
      const $ = load(data);
  
      const movies = [];
  
      $('article.item-infinite').each((index, element) => {
        const title = $(element).find('h2.entry-title a').text();
        const link = $(element).find('h2.entry-title a').attr('href');
        const imageUrl = $(element).find('img').attr('srcset');
        const image = imageUrl ? (() => {
            const srcsetArray = imageUrl.split(',').map(item => item.trim());
            return srcsetArray[srcsetArray.length - 1].split(' ')[0];
        })() : null;
        const rating = $(element).find('.gmr-rating-item').text().trim();
        const duration = $(element).find('.gmr-duration-item').text().trim();
        const quality = $(element).find('.gmr-quality-item a').text().trim();
        const releaseDate = $(element).find('time').attr('datetime');
        const categories = [];
  
        $(element)
          .find('.gmr-movie-on a')
          .each((i, el) => {
            categories.push($(el).text().trim());
          });
  
        movies.push({
          title,
          link,
          image,
          rating,
          duration,
          quality,
          releaseDate,
          categories,
        });
      });
  
      res.json(movies);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });
// MOVIE ROMANCE

// MOVIE DETAIL
app.get('/api/movie-details/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const url = `https://www.sweetteagrille.com/${movieId}`;

  try {
    const { data } = await axios.get(url);
    const $ = load(data);

    // Optimize image fetching
    const imageUrl = $('img.wp-post-image')
      .attr('srcset')
      ?.split(',')
      .map(item => {
        const [url, size] = item.trim().split(' ');
        return { url, size: parseInt(size.replace('w', '')) };
      })
      .sort((a, b) => b.size - a.size)[0]?.url || null;

    const title = $('h1.entry-title').text();
    const ratingValue = $('span[itemprop="ratingValue"]').text();
    const ratingCount = $('span[itemprop="ratingCount"]').text();
    const description = $('div.entry-content p').text();
    
    const director = $('div.gmr-moviedata span[itemprop="director"] span[itemprop="name"]').text();
    
    const cast = $('div.gmr-moviedata span[itemprop="actors"] span[itemprop="name"]').map((i, el) => $(el).text()).get().join(', ');
    
    const releaseDate = $('div.gmr-moviedata time[itemprop="dateCreated"]').attr('datetime');
    
    const genre = $('div.gmr-moviedata a[rel="category tag"]').map((i, el) => {
      const genreText = $(el).text().trim();
      return genreText && isNaN(genreText) ? genreText : null;
    }).get().filter(Boolean).join(', ');

    const country = $('div.gmr-moviedata span[itemprop="contentLocation"] a[rel="tag"]').map((i, el) => $(el).text()).get().join(', ');
    const language = $('div.gmr-moviedata span[property="inLanguage"]').text();
    
    const videoUrl = $('iframe').attr('src');
    const views = $('div.gmr-movie-view strong:contains("Views")').next().text().trim();
    const duration = $('div.gmr-moviedata:contains("Duration") span[property="duration"]').text().trim();

    res.json({
      title,
      imageUrl,
      rating: {
        value: ratingValue,
        count: ratingCount
      },
      description,
      director,
      cast,
      releaseDate,
      genre,
      country,
      language,
      videoUrl,
      views,
      duration
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Error fetching movie details' });
  }
});
  
// MOVIE DETAIL




// MOVIE SEARCH
app.get('/api/movie-search/:searchId', async (req, res) => {
  const { searchId } = req.params;
  const url = `https://www.sweetteagrille.com/?s=${searchId}&post_type[]=post&post_type[]=tv`;

  try {
    const { data } = await axios.get(url);
    const $ = load(data);

    const movies = [];

    $('article.item-infinite').each((i, element) => {

      const title = $(element).find('.entry-title a').text().trim();
      const link = $(element).find('.entry-title a').attr('href');
      const rating = $(element).find('.gmr-rating-item').text().trim();
      const duration = $(element).find('.gmr-duration-item').text().trim();
      const genres = $(element)
        .find('.gmr-movie-on a')
        .map((i, el) => $(el).text())
        .get()
        .join(', ');
      const imageUrl = $(element).find('.content-thumbnail img').attr('srcset');
      const srcsetArray = imageUrl.split(',').map(item => item.trim());
      const largestImage = srcsetArray[srcsetArray.length - 1].split(' ')[0];
      const image = largestImage;
      const releaseDate = $(element).find('time').attr('datetime');
      const director = $(element).find('span[itemprop="director"] span[itemprop="name"] a').text().trim();
      const trailer = $(element).find('.gmr-trailer-popup').attr('href');
      
      movies.push({
        title,
        link,
        rating,
        duration,
        genres,
        image,
        releaseDate,
        director,
        trailer,
      });
    });

    res.json(movies);
  } catch (error) {
    console.error('Error fetching movie data:', error);
    res.status(500).json({ error: 'Failed to fetch movie data' });
  }
});

//  MOVIE SEARCH

// MOVIE INDO
app.get('/api/movie-indo', async (req, res) => {
  const url = `https://www.sweetteagrille.com/?s=&search=advanced&post_type=movie&index=&orderby=&genre=&movieyear=&country=indonesia&quality=`;

  try {
    const { data } = await axios.get(url);
    const $ = load(data);

    const movies = [];

    $('article.item-infinite').each((i, element) => {

      const title = $(element).find('.entry-title a').text().trim();
      const link = $(element).find('.entry-title a').attr('href');
      const rating = $(element).find('.gmr-rating-item').text().trim();
      const duration = $(element).find('.gmr-duration-item').text().trim();
      const genres = $(element)
        .find('.gmr-movie-on a')
        .map((i, el) => $(el).text())
        .get()
        .join(', ');
      const imageUrl = $(element).find('.content-thumbnail img').attr('src');
      const srcsetArray = imageUrl.split(',').map(item => item.trim());
      const largestImage = srcsetArray[srcsetArray.length - 1].split(' ')[0];
      const image = largestImage;
      const releaseDate = $(element).find('time').attr('datetime');
      const director = $(element).find('span[itemprop="director"] span[itemprop="name"] a').text().trim();
      const trailer = $(element).find('.gmr-trailer-popup').attr('href');
      
      movies.push({
        title,
        link,
        rating,
        duration,
        genres,
        image,
        releaseDate,
        director,
        trailer,
      });
    });

    res.json(movies);
  } catch (error) {
    console.error('Error fetching movie data:', error);
    res.status(500).json({ error: 'Failed to fetch movie data' });
  }
});

//  MOVIE INDO

// GENRES
app.get('/api/genres', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.sweetteagrille.com/');
    
    const $ = load(data);
    
    const genres = [];
    $('ul.sub-menu li').each((i, el) => {
      const genreName = $(el).find('span[itemprop="name"]').text();
      const genreUrl = $(el).find('a').attr('href');
      
      genres.push({ name: genreName, url: genreUrl });
    });

    res.json(genres);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching genres', error });
  }
});

//  GENRES

//MOVIE GENRES
app.get('/api/movie-genre/:genreId', async (req, res) => {  
  const {genreId} = req.params;
  try {
    const url = `https://www.sweetteagrille.com/${genreId}/`;
    const { data } = await axios.get(url);
    const $ = load(data);

    const movies = [];

    $('article.item-infinite').each((index, element) => {
      const title = $(element).find('h2.entry-title a').text();
      const link = $(element).find('h2.entry-title a').attr('href');
      const imageUrl = $(element).find('img').attr('src');
      const srcsetArray = imageUrl.split(',').map(item => item.trim());
      const largestImage = srcsetArray[srcsetArray.length - 1].split(' ')[0];
      const image = largestImage;
      const rating = $(element).find('.gmr-rating-item').text().trim();
      const duration = $(element).find('.gmr-duration-item').text().trim();
      const quality = $(element).find('.gmr-quality-item a').text().trim();
      const releaseDate = $(element).find('time').attr('datetime');
      const categories = [];

      $(element)
        .find('.gmr-movie-on a')
        .each((i, el) => {
          categories.push($(el).text().trim());
        });

      movies.push({
        title,
        link,
        image,
        rating,
        duration,
        quality,
        releaseDate,
        categories,
      });
    });

    res.json(movies);
    // console.log(url)
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
//MOVIE GENRES


app.listen(PORT, () => {
  // MOVIE GENRE
  console.log(`Server is running on http://localhost:${PORT}`);
});
