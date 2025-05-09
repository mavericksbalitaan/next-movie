import MovieCard from "./MovieCard";
import { Movies } from "@/types";

export default function AllMovies({ movies }: Movies) {
  return (
    <div className="flex flex-col items-center md:grid md:grid-cols-4 flex-wrap justify-center gap-4">
      {movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </div>
  );
}
