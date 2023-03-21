import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {GlobleContext} from './Context/Globle_Context';
import { FilterContext } from './Context/FilterContext';
import { CartContext } from './Context/CartContext';
import { AuthContext } from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext>
    <GlobleContext>
    <FilterContext>
   <CartContext>
   <BrowserRouter>
    <App />
    </BrowserRouter>
   </CartContext>
    </FilterContext>
    </GlobleContext>
    </AuthContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
