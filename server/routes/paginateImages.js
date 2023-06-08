/*
This file defines a route handler for the / endpoint to handle a GET request for paginated images.
It utilizes the Express framework and Axios for making HTTP requests. The handler retrieves the page, 
perPage, query, and sortBy values from the request's query parameters. 
It then makes an API call to Pixabay to fetch images based on the query. 
The fetched images are sorted using the sortImages function from the sortUtils module. 
Finally, the sorted images are paginated using the paginateImages function from the paginateUtils module, 
and the paginated images are sent as the response.
*/

const express = require('express');
const axios = require('axios');
const router = express.Router();
const { sortImages } = require('../utils/sortUtils');
const { paginateImages } = require('../utils/paginateUtils');

// Handle GET request for paginated images
router.get('/', async (req, res, next) => {
  try {
    const { page, perPage, query,sortBy } = req.query;

    // Make an API call to fetch images from Pixabay based on the query
    const response = await axios.get(
      `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${query}`
    );

    // Sort the fetched images based on the specified sort order
    const sortedImages = sortImages(response.data.hits, sortBy);

    // Paginate the sorted images based on the specified page and perPage values
    const paginatedImages = paginateImages(sortedImages, page, perPage);

    // Send the paginated images as the response
    res.json(paginatedImages);
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;




