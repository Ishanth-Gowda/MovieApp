import React, { useEffect, useState } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";
import "./Watchlist.css";

export default function Watchlist() {
    const { watchlist, clearWatchlist } = useWatchlist();
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowScroll(window.scrollY > 350);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="watchlist-page">
            <div className="watchlist-top">
                <h2>Your Watchlist</h2>
                {watchlist.length > 0 && (
                    <button className="clear-all" onClick={() => {
                        if (window.confirm("Are you sure you want to clear entire watchlist?")) clearWatchlist();
                    }}>
                        Clear All
                    </button>
                )}
            </div>

            {watchlist.length === 0 ? (
                <p className="empty-msg">Your watchlist is empty.</p>
            ) : (
                <div className="watchlist-grid">
                    {watchlist.map(m => <MovieCard key={m.imdbID} movie={m} />)}
                </div>
            )}

            {showScroll && (
                <button className="scroll-top" onClick={scrollToTop} aria-label="Scroll to top">↑</button>
            )}
        </div>
    );
}