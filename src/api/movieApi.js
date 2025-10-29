const API_KEY = "fc1eeb97"; // Replace with your key
const BASE_URL = "https://www.omdbapi.com/";

export async function fetchPopularMovies() {
    // OMDb doesn’t have a “popular” endpoint — so we use a default search
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=avengers&type=movie&page=1`);
    const data = await res.json();
    return data.Search || [];
}

export async function searchMovies(query) {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`);
    const data = await res.json();
    return data.Search || [];
}

export async function fetchMovieDetails(id) {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    return res.json();
}