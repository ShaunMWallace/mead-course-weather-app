const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
/**
 * absolute path to public folder.  
 * path module takes the base path and then allows you to navigate
 * 
 **/
//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//allows express to serve static files
app.use(express.static(publicDirectory));

//Route for HBS
app.get('/', (req, res) => {
  //Think of the second argument as props
  res.render('index', {
    title: 'Weather',
    name: 'Shaun',
    pageTitle: 'Home Page',
    msg: 'Use this site to get your Weather'
  })
});

//app.com/about
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Shaun',
    pageTitle: 'About Page'
  })
});

//app.com/help
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Shaun',
    msg: 'Welcome to the help page',
    pageTitle: 'Help Page'
  });
});

//app.com/weather
app.get('/weather', (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: 'Location is required'
    });
  }

  const { location } = req.query;
  
  geocode(location, (error, { placeName, latitude, longitude } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(longitude, latitude, (error, { todaySummary, currentRainChance, currentTemp } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
     return res.send({
        forecast: `${todaySummary} The current temperature is ${currentTemp} degrees. There is ${currentRainChance}% chance of rain today.`,
        location: placeName,
        address: location
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  } 
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Article not found.',
    title: '404',
    name: 'Shaun',
    pageTitle: '404'
  });
});

app.get('*', (req, res) => {
res.render('404', {
  errorMessage: '404 Page not found',
  title: '404',
  name: 'Shaun',
  pageTitle: '404 Page'
})
});

//required by express for port
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
