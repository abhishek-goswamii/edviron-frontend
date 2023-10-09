import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({})

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
  <ThemeProvider theme={theme}>

    <App />
  </ThemeProvider>

  </BrowserRouter>
  
)
