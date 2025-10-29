import React, { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState(() => {
        try {
            const raw = localStorage.getItem("watchlist");
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
        } catch { }
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        setWatchlist((prev) => {
            if (!prev.some((m) => m.imdbID === movie.imdbID)) return [...prev, movie];
            return prev;
        });
    };

    const removeFromWatchlist = (id) => {
        setWatchlist((prev) => prev.filter((m) => m.imdbID !== id));
    };

    const clearWatchlist = () => setWatchlist([]);

    const hasInWatchlist = (id) => watchlist.some((m) => m.imdbID === id);

    return (
        <WatchlistContext.Provider
            value={{
                watchlist,
                addToWatchlist,
                removeFromWatchlist,
                clearWatchlist,
                hasInWatchlist,
            }}
        >
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);