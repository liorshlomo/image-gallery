/*
This file defines a route handler for the / endpoint to handle a GET request for sorted images. 
It utilizes the Express framework and Axios for making HTTP requests. The handler retrieves the sortBy, perPage, 
and query values from the request's query parameters. It then makes an API call to Pixabay to fetch images based on the query. 
The fetched images are sorted using the sortImages function from the sortUtils module. 
The handler then limits the sorted images to the specified number of images per page. 
Finally, it sends the limited images and the total number of sorted images as the response.
*/

const express = require('express');
const axios = require('axios');
const router = express.Router();
const { sortImages } = require('../utils/sortUtils');

// Handle GET request for sorted images
router.get('/', async (req, res, next) => {
  try { 
    const { sortBy, perPage,query } = req.query;

     // Make an API call to fetch images from Pixabay based on the query
    const response = await axios.get(
      `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${query}`
    );

    // Sort the fetched images based on the specified sort order
    const sortedImages = sortImages(response.data.hits, sortBy);

    // Limit the sorted images to the specified number of images per page
    const limitedImages = sortedImages.slice(0, Math.min(perPage, sortedImages.length));
  
    // Send the limited images and total number of sorted images as the response
    res.json({
      images: limitedImages,
      total: sortedImages.length,
    });
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
