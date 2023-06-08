import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
  currentPage: 1,
  perPage: 9, // Define the number of images per page
  totalImages: 0,
  selectedImage: null,
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalImages: (state, action) => {
      state.totalImages = action.payload;
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    prevPage: (state) => {
      state.currentPage = Math.max(state.currentPage - 1, 1);
    },
    nextPage: (state) => {
      state.currentPage = Math.min(state.currentPage + 1, Math.ceil( state.totalImages / state.perPage));
    },
  },
});

export const { setImages, setCurrentPage, prevPage, setSelectedImage, nextPage ,setTotalImages} = imagesSlice.actions;

export default imagesSlice.reducer;
