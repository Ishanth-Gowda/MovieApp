import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import "./Home.css";

const API_KEY = "fc1eeb97";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showScroll, setShowScroll] = useState(false);

    const fetchRandomMovies = async () => {
        setLoading(true);
        try {
            const keywords = [
                "Avengers", "Batman", "Inception", "Joker", "Titanic", "Interstellar", "Iron Man",
                "Thor", "Matrix", "Deadpool", "John Wick", "Star Wars", "Black Panther", "Doctor Strange",
                "Mission Impossible", "Shrek", "Frozen", "Harry Potter", "Guardians", "Coco", "Toy Story"
            ];

            // fetch first page for a subset of keywords to keep it reasonable
            const results = [];
            const selected = keywords.slice(0, 14);
            await Promise.all(selected.map(async (k) => {
                try {
                    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(k)}&page=1`);
                    const data = await res.json();
                    if (data && data.Search) results.push(...data.Search);
                } catch { }
            }));

            const unique = [];
            const seen = new Set();
            for (const m of results) {
                if (m && m.imdbID && !seen.has(m.imdbID)) {
                    seen.add(m.imdbID);
                    unique.push(m);
                }
            }

            setMovies(unique.slice(0, 60));
        } catch (err) {
            console.error("fetchRandomMovies err", err);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const searchMovies = async (query) => {
        if (!query) {
            fetchRandomMovies();
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=1`);
            const data = await res.json();
            setMovies(data.Search || []);
        } catch {
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomMovies();
        const onRefresh = () => fetchRandomMovies();
        window.addEventListener("refreshHomeMovies", onRefresh);

        const onScroll = () => setShowScroll(window.scrollY > 350);
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("refreshHomeMovies", onRefresh);
            window.removeEventListener("scroll", onScroll);
        };
        // eslint-disable-next-line
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="home-page">
            <SearchBar onSearch={searchMovies} />
            {loading ? (
                <p className="loading">Loading movies...</p>
            ) : movies.length > 0 ? (
                <div className="home-grid">
                    {movies.map(m => <MovieCard key={m.imdbID} movie={m} />)}
                </div>
            ) : (
                <p className="no-results">No movies found.</p>
            )}

            {showScroll && (
                <button className="scroll-top" onClick={scrollToTop} aria-label="Scroll to top">↑</button>
            )}
        </div>
    );
}