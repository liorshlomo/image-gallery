import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    showModal: false,
};

export const modalSlice = createSlice({
    name: "modal", 
    
    initialState,
    reducers: { 
        // Reducer function to set the display of the modal  
        setShowModal: (state, action) => {
        state.showModal = action.payload;
        },    
      },
});

export const {setShowModal} = modalSlice.actions;

export default modalSlice.reducer;
