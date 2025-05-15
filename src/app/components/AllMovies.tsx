import MovieCard from "./MovieCard";
import { Movie, Movies } from "@/types";
import { useState } from "react";
import { fetchMovies } from "../lib/movies";

export default function AllMovies({ movies, searchTerm }: Movies) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [list, setList] = useState<Movie[]>(movies);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNext = async () => {
    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetchMovies(nextPage, searchTerm);
      if (typeof response !== "string") {
        setCurrentPage(nextPage);
        setList(response);
      }
    } catch (error) {
      console.error("Error fetching next page:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = async () => {
    if (currentPage <= 1) return;
    setIsLoading(true);
    try {
      const prevPage = currentPage - 1;
      const response = await fetchMovies(prevPage, searchTerm);
      if (typeof response !== "string") {
        setCurrentPage(prevPage);
        setList(response);
      }
    } catch (error) {
      console.error("Error fetching previous page:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center md:grid md:grid-cols-4 flex-wrap justify-center gap-4">
        {list.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className={`cursor-pointer ${currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-white hover:underline"
            }`}
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
        >
          Previous
        </button>
        <span className="text-white">{currentPage}</span>
        <button
          className="text-white cursor-pointer hover:underline"
          onClick={handleNext}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Next"}
        </button>
      </div>
    </>
  );
}
