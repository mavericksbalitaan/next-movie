"use client";

import { useState, useEffect, useCallback } from "react";
import AllMovies from "./AllMovies";
import { useDebounce } from "react-use";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = useCallback(async (query = "") => {
    setIsLoading(true);
    setError(null);
    const API_OPTIONS = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    };

    try {
      const endpoint = query
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovieList(data.results || []);
    } catch (err: unknown) {
      console.error("Error fetching movies", err);
      let errorMessage = "An unknown error occurred";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      setError(errorMessage);
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchMovies]);

  const handleSearch = () => {
    fetchMovies(searchTerm);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="m-4 flex flex-row items-center gap-4">
        <input
          className="bg-purple-950 w-[300px] text-white p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          name="search"
          value={searchTerm}
          placeholder="Search through thousands of movies"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="button"
          className="bg-white rounded-sm w-[50px] p-2 hover:bg-gray-200 transition-colors"
          onClick={handleSearch}
          disabled={isLoading}
        >
          🔍
        </button>
      </div>

      <div className="w-full max-w-6xl px-4">
        <h1 className="text-white text-4xl mb-4 text-center">All Movies</h1>

        {isLoading ? (
          <p className="text-white text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : movieList.length === 0 ? (
          <p className="text-white text-center">
            No movies found. Try adjusting your search.
          </p>
        ) : (
          <AllMovies movies={movieList} />
        )}
      </div>
    </div>
  );
}
