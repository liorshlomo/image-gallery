/*
This file contains the SearchCategory component, 
which displays an input field and a search button for users to search for images based on a category. 
It uses Redux for state management and axios for making API calls to fetch images. 
It also handles input change events and provides a button to reset the category selection.
*/

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setCategory, toggleShowCategories } from '../features/category';
import { setImages, setCurrentPage, setTotalImages } from '../features/images';
import { setError} from '../features/error';
import axios from 'axios';

const SearchCategory = () => {
  const dispatch = useDispatch();
  const textInput = useSelector((state) => state.category.category);
  const error = useSelector((state) => state.error.errorMessage);
  const perPage = useSelector((state) => state.images.perPage);

  // Handle input change in the category input field
  const handleInputChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  // Handle resetting the category selection and error message
  const handleReset = () => {
    dispatch(setCategory(''));
    dispatch(setError(null));
  };

  // Handle search button click to fetch images based on the category
  const handleSearch = async () => {
    try {

      // Make an API call to fetch images based on the category
      const response = await axios.get('http://localhost:5000/api/sort', {
        params: {
          sortBy: 'id',
          query: textInput,
          perPage: perPage,
        },
      });

        //Update the images, total number of images, and current page in the Redux store
        dispatch(setImages(response.data.images));
        dispatch(setTotalImages(response.data.total));
        dispatch(setCurrentPage(1));
         // Toggle showCategories to display the image grid
        dispatch(toggleShowCategories());

    } catch (error) {
      console.log(error);
      dispatch(setError('Error fetching images. Please try again later.'));
    }
  };

  return (
    <div className="input-container">
      {error ? (  
      <div>{error} 
          <button className="centered-button-17 position-top-center" onClick={handleReset}>
            Change Category
          </button>
     </div>
    ) : (
      <div>
       <h1>MSApps Gallery</h1>
        <input
          type="text"
          value={textInput}
          onChange={handleInputChange}
          className="input-text"
          placeholder="Enter your images category"
        />
        <button className="centered-button-17" onClick={handleSearch}> Search </button>
      </div>
    )}
    </div>
  );
};

export default SearchCategory;
