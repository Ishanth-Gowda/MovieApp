import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate("/");
        window.dispatchEvent(new Event("refreshHomeMovies"));
    };

    return (
        <header className="nav-header">
            <div className="nav-inner">
                <a href="/" className="site-title" onClick={handleHomeClick}>
                    🎬 The Movie List 🍿
                </a>
                <nav className="nav-links">
                    <Link to="/" onClick={handleHomeClick}>Home</Link>
                    <Link to="/genres">Genres</Link>
                    <Link to="/watchlist">Watchlist</Link>
                </nav>
            </div>
        </header>
    );
}