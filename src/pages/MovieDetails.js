import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import "./MovieDetails.css";

const API_KEY = "fc1eeb97";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const { addToWatchlist, removeFromWatchlist, hasInWatchlist } = useWatchlist();

    useEffect(() => {
        let mounted = true;
        const fetchMovie = async () => {
            try {
                const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
                const data = await res.json();
                if (mounted) setMovie(data.Response === "True" ? data : null);
            } catch (e) {
                if (mounted) setMovie(null);
            }
        };
        fetchMovie();
        return () => { mounted = false; };
    }, [id]);

    if (!movie) return <p className="loading">Loading...</p>;

    const inList = hasInWatchlist(movie.imdbID);

    return (
        <div className="details-page">
            <button className="back-btn" onClick={() => navigate(-1)}>← Go Back</button>

            <div className="details-wrap">
                <img
                    className="details-poster"
                    src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Image"}
                    alt={movie.Title}
                />
                <div className="details-info">
                    <h2>{movie.Title} ({movie.Year})</h2>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Runtime:</strong> {movie.Runtime}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>Plot:</strong> {movie.Plot}</p>
                    <p><strong>IMDb:</strong> {movie.imdbRating}</p>

                    <div className="details-actions">
                        {!inList ? (
                            <button className="watchlist-btn" onClick={() => addToWatchlist(movie)}>+ Add to Watchlist</button>
                        ) : (
                            <button className="watchlist-btn remove" onClick={() => removeFromWatchlist(movie.imdbID)}>Remove from Watchlist</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}