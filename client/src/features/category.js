import {createSlice} from '@reduxjs/toolkit';

const  initialState= {
  category: '',
  showCategories: false,
};

// Create a category slice using createSlice from Redux Toolkit
export const categorySlice = createSlice({
    name: "category", 
    
    initialState,
    reducers: {   
        // Reducer function to set the selected category
        setCategory: (state, action) => {
        state.category = action.payload;
        },    
        // Reducer function to toggle the display of categories
        toggleShowCategories: (state) => {
          state.showCategories = !state.showCategories;
        },
      },
});

export const {toggleShowCategories,setCategory} = categorySlice.actions;

export default categorySlice.reducer;
