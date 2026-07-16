import React, { useState } from 'react'
import Navbar from './assets/components/section_1/Navbar'
import LoginPage from "./assets/components/LoginPage";

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div>
      <Navbar />
      <LoginPage />
    </div>
  )
}

export default App
