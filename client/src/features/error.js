import {createSlice} from '@reduxjs/toolkit';

const initialState = { errorMessage: null, };

// Create an error slice using createSlice from Redux Toolkit
export const errorSlice = createSlice({
    name: "error", 
    initialState,
    reducers: {   
        // Reducer function to set the error message
        setError: (state, action) => {
        state.errorMessage = action.payload;
        },    
      },
});

export const {setError} = errorSlice.actions;

export default errorSlice.reducer;