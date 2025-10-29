import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch, initial = "" }) {
    const [q, setQ] = useState(initial);

    const submit = (e) => {
        e.preventDefault();
        onSearch(q.trim());
    };

    return (
        <form className="searchbar" onSubmit={submit}>
            <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for movies..."
                aria-label="Search movies"
            />
            <button type="submit">Search</button>
        </form>
    );
}