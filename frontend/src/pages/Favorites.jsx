import "../css/Favorites.css"
import { useMovieContext } from "../../contexts/MovieContext"
import MovieCard from "../components/MovieCard"
import { useState } from "react"

const Favorites = () => {
    const {favorites, clearFavorites} = useMovieContext()
    const [searchMovie, setSearchMovie] = useState("")

    const handleClear = () => {
        clearFavorites();
    }
    if(favorites.length > 0){
        return(
            <div className = "favorites">
                <h2>Your Favorites</h2>

                <form className="search-form">
                    <input 
                        type="text" 
                        placeholder="Type your movie"
                        className="search-input"
                        value={searchMovie}
                        onChange={(e)=>{
                            setSearchMovie(e.target.value)
                        }}
                    />
                </form>
                <button className="clear-fav" onClick={handleClear}>Clear All</button>
                <div className="movies-grid">
                    {favorites
                        .filter(movie => movie.title.toLowerCase()
                        .includes(searchMovie.toLowerCase()))
                        .map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                </div>  
            </div>
        )
    }
    return (
        <div className="favourites-empty">
            <h2>No Favorite Movies Yet</h2>
            <p> Start adding movies to your favorite by giving them heart</p>
        </div>
    ) 
}

export default Favorites
