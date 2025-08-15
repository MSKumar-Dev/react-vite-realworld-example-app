import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home, Settings, Editor, Article, Profile, Auth } from './pages'
import { AuthRoute, GuestRoute, Navbar } from './components'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<GuestRoute element={<Auth key="register" />} />} />
          <Route path="/login" element={<GuestRoute element={<Auth key="login" />} />} />
          <Route path="/settings" element={<AuthRoute element={<Settings />} />} />
          <Route path="/editor" element={<AuthRoute element={<Editor />} />} />
          <Route path="/editor/:slug" element={<Editor />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/@:username" element={<AuthRoute element={<Profile />} />} />
        </Routes>
      </main>
      <footer>
        <div className="container">
          <Link to="/" className="logo-font">
            conduit
          </Link>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </Router>
  )
}

export default App
