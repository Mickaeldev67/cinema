import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import MoviesDetails from './components/MoviesDetails';

function App() {
  return(
    <>
    <h1 className="bg-gray-300 text-gray-800">
      Cinémathèque
    </h1>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/moviedetails' element={<MoviesDetails />} />
      </Routes>
    </>
  )
  
}

export default App;
