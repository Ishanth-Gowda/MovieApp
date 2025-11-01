import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./Genres.css";

const genres = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", "Drama",
    "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller",
    "War", "Western"
];

const API_KEY = "fc1eeb97";

export default function Genres() {
    const navigate = useNavigate();
    const location = useLocation();
    const restoredGenre = location.state?.genre || null;

    const [selectedGenre, setSelectedGenre] = useState(restoredGenre);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showScroll, setShowScroll] = useState(false);

    const fetchMoviesByGenre = async (genre) => {
        setSelectedGenre(genre);
        setLoading(true);
        try {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${genre}`);
            const data = await res.json();
            setMovies(data.Search || []);
        } catch {
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    // Restore movies if navigated back from MovieDetails
    useEffect(() => {
        if (restoredGenre) fetchMoviesByGenre(restoredGenre);
        // eslint-disable-next-line
    }, []);

    // Scroll-to-top visibility handler
    useEffect(() => {
        const handleScroll = () => setShowScroll(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="genres-page">
            <button
                className="back-btn"
                onClick={() => {
                    if (selectedGenre) {
                        // Go back to the genre list
                        setSelectedGenre(null);
                    } else {
                        // Go back to the homepage
                        navigate("/");
                    }
                }}
            >
                ← Go Back
            </button>

            {!selectedGenre ? (
                <div className="genres-list">
                    {genres.map((g) => (
                        <div key={g} className="genre-card" onClick={() => fetchMoviesByGenre(g)}>
                            <h3>{g}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <h2 className="genre-title">{selectedGenre} Movies</h2>
                    {loading ? (
                        <p className="loading">Loading...</p>
                    ) : movies.length > 0 ? (
                        <div className="genre-movies-grid">
                            {movies.map((m) => (
                                <MovieCard key={m.imdbID} movie={m} fromGenre={selectedGenre} />
                            ))}
                        </div>
                    ) : (
                        <p className="loading">No movies found.</p>
                    )}
                </>
            )}

            {showScroll && (
                <button className="scroll-to-top" onClick={scrollToTop}>
                    ↑
                </button>
            )}
        </div>
    );
}