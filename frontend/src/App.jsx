import React from 'react'
import { Routes,Route } from "react-router-dom";
import Register from './components/Register';
import Home from './components/Home';
import Document from './components/Document';
import Login from './components/Login';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Register />}/>
        <Route path='/login' element = {<Login />}/>
        <Route path='/home' element = {<Home />}/>
        <Route path='/document/:id' element = {<Document />}/>
      </Routes>
    </div>
  )
}

export default App