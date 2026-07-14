import React from 'react'
import Home from './Home'
import Blog from './Blog'
import About from './About'
import Login from './Login'
const Navbar = () => {
    return (
        <div className="p-5 flex items-center justify-between">
            <img src="https://plus.unsplash.com/premium_photo-1675978139360-13d596a8cc08?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWFydGglMjBhcyUyMGxvZ298ZW58MHx8MHx8fDA%3D" alt="logo" className="w-15 h-15 mx-5 object-cover rounded-full" />
            <section className="flex flex-row items-center justify-center gap-54 px-15">
                <Home />
                <Blog />
                <About />
                <Login />
            </section>
        </div>
    )
}

export default Navbar