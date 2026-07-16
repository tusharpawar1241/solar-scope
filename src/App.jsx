import { Routes, Route } from 'react-router-dom'
import Home from './assets/components/Home/Home'
import BlogPage from './assets/components/blog/BlogPage'
import React, { useState } from 'react'
import Navbar from './assets/components/section_1/Navbar'
import LoginPage from "./assets/components/LoginPage";

const App = () => {
  return (
    <div>
      <Navbar />

      {/*Home page */}
      <Routes>
        <Route 
          path="/"
          element={<Home />} 
        />
        
        {/*Blog Page*/}
        <Route 
          path="/blog" 
          element={
            <main className="max-w-6xl mx-auto px-4 py-8">
              <BlogPage />
            </main>
          } 
        />
        
        {/*About Page*/}
        <Route 
          path="/about" 
          element={
            <div className="text-center mt-20">
              <h2 className="text-3xl font-bold">About SolarScope</h2>
              <p className="mt-4 text-slate-400">Monitoring solar activity and data analysis.</p>
            </div>
          } 
        />
        
        {/*Login Page*/}
        <Route 
          path="/login" 
          element={
            <div className="text-center mt-20">
              <LoginPage />
            </div>
          } 
        />
      </Routes>
    </div>
  )
}

export default App;
