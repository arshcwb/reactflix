import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])
    
    useEffect(()=>{
        const storedFavs = localStorage.getItem("favorites")
        if(storedFavs) setFavorites(JSON.parse(storedFavs));
    }, [])

    useEffect(() => {
        if(favorites.length > 0) localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])


    const addToFav = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const remFromFav = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFav = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const clearFavorites = () => {
        setFavorites([]);
        localStorage.removeItem("favorites");
    };


    const value = {
        favorites,
        addToFav,
        remFromFav,
        isFav,
        clearFavorites
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}