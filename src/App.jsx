import React, { useState } from 'react'
import Navbar from './assets/components/section_1/Navbar'
import Mercury from './assets/components/section_1/planets/Mercury'
import Venus from './assets/components/section_1/planets/Venus'
import Earth from './assets/components/section_1/planets/Earth'
import Mars from './assets/components/section_1/planets/Mars'
import Jupiter from './assets/components/section_1/planets/Jupiter'
import Saturn from './assets/components/section_1/planets/Saturn'
import Uranus from './assets/components/section_1/planets/Uranus'
import Neptune from './assets/components/section_1/planets/Neptune'
import Pluto from './assets/components/section_1/planets/Pluto'

import BlogPage from './assets/components/blog/BlogPage'

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-3 justify-items-center py-10 gap-10">
        <Mercury />
        <Venus />
        <Earth />
        <Mars />
        <Jupiter />
        <Saturn />
        <Uranus />
        <Neptune />
        <Pluto />
      </div>
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'Home' && (
          <div className="text-center mt-20">
            <h2 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Welcome to SolarScope
            </h2>
            <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
              Explore solar analytics, track metrics, and read community updates.
            </p>
          </div>
        )}

        {activeTab === 'Blog' && <BlogPage />}

        {activeTab === 'About' && (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold">About SolarScope</h2>
            <p className="mt-4 text-slate-400">Monitoring solar activity and data analysis.</p>
          </div>
        )}

        {activeTab === 'Login' && (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-cyan-400">Account Login</h2>
            <p className="mt-4 text-slate-400">Authentication interface coming soon.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App