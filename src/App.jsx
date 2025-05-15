import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Dogs from './components/Dogs';
import Cats from "./components/Cats";
import Navbar from "./components/Navbar"
import CatDetails from "./components/CatDetails";
import DogDetails from './components/DogDetails';
import './App.css'

function App() {
  const API_URL = "http://localhost:5264/api/";
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}/>
        <Route path="/dogs" element={<Dogs apiUrl={API_URL}/>}/>
        <Route path='/dogs/:name' element={<DogDetails apiUrl={API_URL}/>} />
        <Route path="/cats" element={<Cats apiUrl={API_URL}/>}/>
        <Route path='/cats/:name' element={<CatDetails apiUrl={API_URL}/>} />
      </Routes>
    </Router>
  )
}

export default App
