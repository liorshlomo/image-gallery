/*
This file contains the MainGallery component, which is the main component for the gallery application.
It renders either the ImageGrid component or the SearchCategory component based on the showCategories state value.
It also provides a button to reset the category selection.
 */

import '../components.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageGrid from './imageGrid';
import SearchCategory from './searchCategory';
import { toggleShowCategories,setCategory } from '../features/category';

const MainGallery = () => {

   // Retrieve data from the Redux store
  const showCategories = useSelector((state) => state.category.showCategories);
  const dispatch = useDispatch();

  // Handle resetting category selection
  const handleReset = () => {
    dispatch(toggleShowCategories());
    dispatch(setCategory(''));
  };

  return (
    <div className="centered-container">
      {showCategories ? (
        <>
          <ImageGrid />
          <button className="centered-button-17 position-top-center" onClick={handleReset}>
            Change Category
          </button>
        </>
      ) : (
        // Render SearchCategory if showCategories is false
        <SearchCategory />
      )}
    </div>
  );
};

export default MainGallery;
