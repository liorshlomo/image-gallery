/* 
This file contains the ImageGrid component, which displays a grid of images and handles pagination. 
It uses Redux for state management and axios for making API calls to fetch images. 
The component also handles image click events and opens a modal to display image details. 
*/

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setImages, prevPage, nextPage,setSelectedImage} from '../features/images';
import { setShowModal} from '../features/modal';
import { setError} from '../features/error';
import axios from 'axios';
import ImageModal from './imageModal';

const ImageGrid = () => {

  const dispatch = useDispatch();
  // Retrieve data from the Redux store
  const error = useSelector((state) => state.error.errorMessage);
  const selectedImage = useSelector((state) => state.images.selectedImage);
  const showModal = useSelector((state) => state.modal.showModal);
  const textInput = useSelector((state) => state.category.category);
  const images = useSelector((state) => state.images.images);
  const currentPage = useSelector((state) => state.images.currentPage);
  const totalNumOfImages = useSelector((state) => state.images.totalImages);
  const perPage = useSelector((state) => state.images.perPage);
  
  // Close the image modal
  const closeModal = () => {dispatch(setShowModal(false))};

   // Handle page change when the Prev or Next button is clicked
  const handlePageChange = async (pageMove) => {
    try {
      const page = pageMove === 'prev' ? currentPage - 1 : currentPage + 1;
      // Make an API call to fetch images based on the new page and other parameters
      const response = await axios.get('http://localhost:5000/api/paginate', {
        params: {
          sortBy: 'id',
          page: page,
          query: textInput,
          perPage: perPage
        }
      });
  
      // Update the images in the Redux store
      dispatch(setImages(response.data));
      // Dispatch either prevPage or nextPage action based on the pageMove parameter
      if (pageMove === 'prev') { dispatch(prevPage());} 
      else { dispatch(nextPage());}

    } catch (error) { 
      console.log(error);
      dispatch (setError('Error fetching images. Please try again later.'));}
  };

    // Handle previous and next page button click
  const handlePrevPage = () => { handlePageChange('prev');};
  const handleNextPage = () => { handlePageChange('next');};
  
   // Handle image click to open the modal
  const handleImageClick = (image) => {
    dispatch(setSelectedImage(image));
    dispatch(setShowModal(true));
  };

  return (
    <>
      {error ? (
        <div>{error}</div>
      ):images.length === 0 ? (
        <div>There are no images in this category. Please try changing it.</div>
      ): (
        <>
          <div className="image-grid">
            {images.map((image) => (
              <img
                key={image.id}
                src={image.previewURL}
                alt={image.tags}
                className="image-item"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
          <div className="pagination-buttons">
            <button
              id="buttonPrev"
              className="button-83 position-top-left"
              onClick={handlePrevPage}
              disabled={currentPage === 1 || showModal}> Prev </button>
            <button
              id="buttonNext"
              className="button-83 position-top-right"
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(totalNumOfImages / perPage) || showModal}> Next </button>
          </div>
          {showModal && <ImageModal selectedImage={selectedImage} closeModal={closeModal} />}
        </>
      )}
    </>
  );
};

export default ImageGrid;
