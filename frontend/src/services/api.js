const BASE_URL = "https://api.themoviedb.org/3"


const getApiKey = () => {
  const apiKey = localStorage.getItem("api_key");
  if (!apiKey) {
    throw new Error("API key not found in localStorage. Please provide a valid key.");
  }
  return apiKey;
};


export const getPopularMovies = async() => {
   try{
        const API_KEY = getApiKey();
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
        }
        const data = await response.json()

        return data.results
    } catch(error){
        console.error("Error fetching popular movies: ", error);
        return [];
    }
};

export const searchMovies = async (query) => {
    try {
        const API_KEY = getApiKey();
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);

        if(!response.ok){
            throw new Error("Failed to search movies")
        }
        const data = await response.json()

        return data.results
    } catch (error) {
    console.error("Error searching movies:", error);
    return [];
    }
};
