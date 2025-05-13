import MovieCard from "./MovieCard";
import { Movies } from "@/types";
import { useState } from "react";

export default function AllMovies({ movies }: Movies) {
  const [currentPage, ] = useState<number>(1);

  return (
    <>
      <div className="flex flex-col items-center md:grid md:grid-cols-4 flex-wrap justify-center gap-4">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className={`cursor-pointer ${currentPage === 1 ? "line-through text-white" : "text-white"} hover:underline`}
          disabled={currentPage === 1 ? true : false}
        >
          Previous
        </button>
        <button className="text-white cursor-pointer hover:underline">
          {currentPage}
        </button>
        <button className="text-white cursor-pointer hover:underline">
          Next
        </button>
      </div>
    </>
  );
}
