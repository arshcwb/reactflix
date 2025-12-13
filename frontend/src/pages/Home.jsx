import '../css/Home.css'
import MovieCard from "../components/MovieCard"
import {useState} from "react"
import { useEffect } from 'react'
import { searchMovies, getPopularMovies } from '../services/api'

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPopular, setIsPopular] = useState(true);
    useEffect(() => {
        (async () => {
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
                setIsPopular(true)
            }
            catch(err){
                setError("Failed to load movies")
            }
            finally{
                setLoading(false)
            }
        })();
    }, [])

    const handleSearch = async (e) =>{
        e.preventDefault()
        
        if(!searchQuery.trim()){
            try{
                const searchResults = await getPopularMovies();
                setMovies(searchResults)
                setIsPopular(true)
                setError(null)
            }catch(err){
                console.log(err)
                setError("Failed to search movies")
            }finally{
                setLoading(false)
            }

            return
        }

        if(loading) return

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults)
            setIsPopular(false)
            setError(null)
        }catch(err){
            console.log(err)
            setError("Failed to search movies")
        }finally{
            setLoading(false)
        }

        setSearchQuery("")
    }


    const relMovies = movies.filter(movie =>
            movie.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
    
    const noMoviesFound = !loading && !relMovies.length && !isPopular


    return (
        <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input 
                type="text"
                placeholder="Type your movie"
                className="search-input"
                value={searchQuery}
                onChange={(e)=>{
                    setSearchQuery(e.target.value)
                }}
            />
            <button type="submit" className="search-btn">Search More</button>
        </form>
        
        {isPopular? <h2 class="info-heading">Popular Movies</h2>:
        <h2 class="info-heading">Relevant Movies</h2>
        }

        {error ? (
            <div className="error-message">{error}</div>
            ) : loading ? (
            <div className="loading">Loading...</div>
            ) : (
            <div className="movies-grid">
                {noMoviesFound ? (
                <div>No such movie found</div>
                ) : relMovies.length > 0 ? (
                relMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))
                ) : (
                <div>Please try clicking on 'Search more'</div>
                )}
            </div>
            )}


        
        <footer>The data has been taken from <a href="https://www.themoviedb.org">The Movie Database</a> </footer>
        </div>
    )
}

export default Home
