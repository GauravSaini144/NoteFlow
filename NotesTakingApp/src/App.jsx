import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom"
import {Toaster} from "react-hot-toast"
import './App.css'


function App() {
return(
  <>
  <Navbar/>
  <Routes>
  <Route path='/' element={<Home/>} />
  </Routes>
  <Toaster/>
  </>
)
}
export default App
