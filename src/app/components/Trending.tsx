"use client";

import { useEffect, useState, useCallback } from "react";
import TrendingCard from "./TrendingCard";

export default function Trending() {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrending = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/trending/movie/week?language=en-US`;
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
      setTrending(data.results || []);
    } catch (err: unknown) {
      console.error(`Error fetching trending movies: ${err}`);
      let errorMessage = "An unknown error occurred.";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      setError(errorMessage);
      setTrending([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  return (
    <>
      <div className="flex gap-x-24 overflow-x-scroll overflow-y-hidden">
        {isLoading ? (
          <p className="text-white text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : trending.length === 0 ? (
          <p className="text-white text-center">
            No trending movies found. Try adjusting your search.
          </p>
        ) : (
          trending?.map((movie, idx) => (
            <TrendingCard key={idx} movie={movie} rank={idx + 1} />
          ))
        )}
      </div>
    </>
  );
}
