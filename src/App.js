import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import "./App.css";

export default function App() {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </main>
          <footer className="footer">© 2025 All rights reserved® | Powered by OMDb API</footer>
        </div>
      </BrowserRouter>
    </WatchlistProvider>
  );
}