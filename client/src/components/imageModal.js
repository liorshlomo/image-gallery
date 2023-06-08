/*
This file contains the ImageModal component, which is a modal that displays detailed information about a selected image. 
It receives the selected image and a closeModal function as props.
*/
import React from 'react';

const ImageModal = ({ selectedImage, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Image Details</h2>
        <p>Views: {selectedImage.views}</p>
        <p>Downloads: {selectedImage.downloads}</p>
        <p>Collection: {selectedImage.collections}</p>
        <button className="close-button" onClick={closeModal}> Close </button>
      </div>
    </div>
  );
};

export default ImageModal;
