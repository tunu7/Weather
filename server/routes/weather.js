const express = require('express'); // Import express
const axios = require('axios'); // Import axios for API calls
const Weather = require('../models/Weather'); // Import the Weather model
const router = express.Router(); // Create a router instance

router.get('/:city', async (req, res) => {
  const city = req.params.city;
  const oneHour = 60 * 60 * 1000; // Define cache duration (1 hour)

  try {
    // Check for cached data in the database
    const cachedData = await Weather.findOne({ city });

    // If cached data exists and is not older than one hour, return it
    if (cachedData && (new Date() - cachedData.lastFetched) < oneHour) {
      return res.json(cachedData.data);
    }

    // Fetch fresh data from the OpenWeatherMap API
    const apiResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
    
    // Prepare new weather data for caching
    const newWeatherData = {
      city,
      data: apiResponse.data,
      lastFetched: new Date()
    };

    // Update the database with the new weather data
    await Weather.findOneAndUpdate({ city }, newWeatherData, { upsert: true });

    // Return the fresh weather data
    res.json(apiResponse.data);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Error fetching weather data');
  }
});

module.exports = router; // Export the router
