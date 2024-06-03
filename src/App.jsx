
import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Chatroom from './pages/chatroom';


const App = () => {



  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/chatroom' element={<Chatroom/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App