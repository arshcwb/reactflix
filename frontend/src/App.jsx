import './css/App.css'
import Home from './pages/Home'
import { useState, useEffect } from 'react'
import Favorites from './pages/Favorites'
import {Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar'
import { MovieProvider } from '../contexts/MovieContext'
import ApiKeyForm from './components/ApiKeyForm'

function App() {
  const [apiKeySubmitted, setApiKeySubmitted] = useState(false);

  useEffect(() => {
    const apiKey = localStorage.getItem("api_key");
    if (apiKey) {
      setApiKeySubmitted(true);
    }
  }, []);

  const handleApiKeySubmit = (apiKey) => {
    setApiKeySubmitted(true);
  };


  return (
    <MovieProvider>
      <Navbar></Navbar>
      <main className="main-content">
        {apiKeySubmitted ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        ) : (
          <ApiKeyForm onSubmit={handleApiKeySubmit} /> // Show the form if API key isn't submitted
        )}
      </main>
    </MovieProvider>
  
  )
}

export default App
