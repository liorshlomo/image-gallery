import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import categoryReducer from "./features/category";
import imagedReducer from "./features/images";
import modalReducer from "./features/modal";
import errorReducer from "./features/error";

//redux-store
const store = configureStore({
  reducer: {
    
    category: categoryReducer,
    images: imagedReducer,
    modal: modalReducer,
    error: errorReducer,
    
  } , 
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);


reportWebVitals();



