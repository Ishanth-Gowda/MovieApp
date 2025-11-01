import React from "react";
import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import "./MovieCard.css";

export default function MovieCard({ movie, fromGenre }) {
    const { addToWatchlist, removeFromWatchlist, hasInWatchlist } = useWatchlist();
    const inList = hasInWatchlist(movie.imdbID);

    return (
        <div className="movie-card">
            <Link
                to={`/movie/${movie.imdbID}`}
                className="movie-link"
                state={fromGenre ? { fromGenre } : null}
            >
                <img
                    src={
                        movie.Poster && movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.Title}
                    className="card-poster"
                />
                <div className="card-meta">
                    <h3 className="card-title">{movie.Title}</h3>
                    <div className="card-year">{movie.Year}</div>
                </div>
            </Link>

            <div className="card-actions">
                {!inList ? (
                    <button className="watchlist-btn" onClick={() => addToWatchlist(movie)}>
                        + Add to Watchlist
                    </button>
                ) : (
                    <button
                        className="watchlist-btn remove"
                        onClick={() => removeFromWatchlist(movie.imdbID)}
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
}