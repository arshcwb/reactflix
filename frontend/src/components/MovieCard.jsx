import '../css/MovieCard.css'
import { useMovieContext } from '../../contexts/MovieContext';

const MovieCard = ({movie}) => {
    const {addToFav, remFromFav, isFav} = useMovieContext()
    const favorite = isFav(movie.id)

    function onFavClick(e){
        e.preventDefault()
        if(favorite) remFromFav(movie.id)
        else addToFav(movie)
    }
    // console.log(movie);
    return (
        <div className='movie-card'>
            <div className='movie-poster'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Image not available" />
                <div className="movie-overlay">
                    <div className="overlay-title">
                        <h3>{movie.title}</h3>
                    </div>
                    <button className={`favorite-btn ${favorite? "active": ""}`} onClick={onFavClick}>
                        ♥️
                    </button>
                    <div className="overlay-content">
                        <p className="movie-description">
                            {movie.overview}
                        </p>
                    </div>
                </div>
            </div>

            <div className="movie-info">
                <h3>{movie.title}</h3>
                {movie.vote_count? <h4>{movie.vote_average.toFixed(1)}</h4>:
                <h4>N/A</h4>
                }
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    )
}

export default MovieCard
