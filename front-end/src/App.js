import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import MainPages from './components/MainPages';
import { DataProvider } from './GlobalState';
import './App.css'
import './fonts.css'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <DataProvider>
      <div class=''>
        <Router>
          <div><Header /></div>
          <div>
            <MainPages />

          </div>
          <div>  <Footer /></div>
        </Router>
      </div>
    </DataProvider>
  )
}

export default App