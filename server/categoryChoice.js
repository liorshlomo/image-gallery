import React, { useState } from 'react';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowCategories } from '../features/category';
import { setImages, setCurrentPage, prevPage, nextPage ,setTotalImages} from '../features/images';
import axios from 'axios';

function CategoryChoice() {
  const dispatch = useDispatch();
  const showCategories = useSelector((state) => state.category.showCategories);
  const [textInput, setTextInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleSearch = async () => {
    try {
      console.log('Sending request to server...');
      const response = await axios.get('http://localhost:5000/sort', {
        params: {
          sortBy: 'id',
          query: textInput,
          perPage: perPage
        }
      });
      dispatch(setImages(response.data.images));
      console.log('Received --- response from server:', response.data.total);
      dispatch(setTotalImages(response.data.total));
      dispatch(setCurrentPage(1));
      dispatch(toggleShowCategories());
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    dispatch(toggleShowCategories());
    setTextInput('');
  };
 
  const handlePrevPage = async () => {
    try {
      const response = await axios.get('http://localhost:5000/paginate', {
        params: {
          sortBy: 'id',
          page: (currentPage - 1),
          query: textInput,
          perPage: perPage
        }
      });
      dispatch(setImages(response.data));
      dispatch(prevPage());
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleNextPage = async () => {
    try {
      const response = await axios.get('http://localhost:5000/paginate', {
        params: {
          sortBy: 'id',
          page: (currentPage + 1),
          query: textInput,
          perPage: perPage
        }
      });
      dispatch(setImages(response.data));
      dispatch(nextPage());
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const images = useSelector((state) => state.images.images);
  const currentPage = useSelector((state) => state.images.currentPage);
  const totalNumOfImages = useSelector((state) => state.images.totalImages);
  const perPage = useSelector((state) => state.images.perPage);
 

  return (
    <div className="centered-container">
      {showCategories ? (
        <>
          <div className="image-grid">


            {images.map((image) => (
              <img key={image.id} src={image.previewURL} alt={image.tags} className="image-item" onClick={() => handleImageClick(image)}/>
            ))}
          </div>
          <div className="pagination-buttons">
            <button className="pagination-button" onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(totalNumOfImages/ perPage)}
            >
              Next
            </button>
          </div>


          {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Image Details</h2>
                <p>Views: {selectedImage.views}</p>
                <p>Downloads: {selectedImage.downloads}</p>
                <p>Collection: {selectedImage.collections}</p>
          <button className="close-button" onClick={() => setShowModal(false)}>
            Close
          </button>
            </div>
          </div>
          )}
          <button className="change-category-button" onClick={handleReset}>
            Change Category
          </button>
        </>
      ) : (
        <div className="input-container">
          <input
            type="text"
            value={textInput}
            onChange={handleInputChange}
            className="centered-textbox"
          />
          <button className="centered-button" onClick={handleSearch}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryChoice;




/*
css
.textBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 1000px;
  height: 40px;
  max-width: 280px;
  overflow: hidden;
  border-radius: 20px;
  border-color: #7db2cb;
  border-bottom-color: #7db2cb;
  /*border-top-color: #7db2cb;
  border-top-style: hidden;
  border-left: #7db2cb;
}

 */
