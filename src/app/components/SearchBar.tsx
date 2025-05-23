"use client";

import { useState, useEffect, useCallback } from "react";
import AllMovies from "./AllMovies";
import { useDebounce } from "react-use";
import Trending from "./Trending";
import Favorites from "./Favorites";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = useCallback(async (query = "") => {
    setIsLoading(true);
    setError(null);
    const endpoint = query
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie?include_adult=false&sort_by=popularity.desc`;

    const API_OPTIONS = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    };

    try {
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovieList(data.results || []);
      setSearchResults(data.total_results);
    } catch (err: unknown) {
      console.error(`Error fetching movies ${err}`);
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
    <div className="flex flex-col items-center w-full">
      <div className="m-4 flex flex-row items-center gap-4 bg-purple-950 py-2 pl-2 pr-4 rounded-4xl">
        <button
          type="button"
          className="w-[50px] p-2 bg-purple-950 border-purple-900 border-4 rounded-full cursor-pointer hover:bg-white"
          onClick={handleSearch}
          disabled={isLoading}
        >
          🔍
        </button>
        <input
          className="bg-purple-950 w-[300px] md:w-[500px] text-white p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          name="search"
          value={searchTerm}
          placeholder="Search through thousands of movies"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="px-4 m-8 w-full max-w-6xl">
        <h1 className="text-white text-2xl mb-4 text-left montserrat-bold">
          Top 10 Movies This Week
        </h1>
        <Trending />
      </div>
      <div className="px-4 m-8 w-full max-w-6xl">
        <h1 className="text-white text-2xl mb-4 text-left montserrat-bold">
          My Favorites
        </h1>
        <Favorites />
      </div>

      <div className="px-4 m-8 w-full max-w-6xl">
        <h1 className="text-white text-2xl mb-4 text-left montserrat-bold">
          {searchTerm
            ? `Search Results: (${searchResults?.toLocaleString()})`
            : "Hot New Releases"}
        </h1>

        {isLoading ? (
          <p className="text-white text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : movieList.length === 0 ? (
          <p className="text-white text-center">
            No movies found. Try adjusting your search.
          </p>
        ) : (
          <AllMovies movies={movieList} searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
}
