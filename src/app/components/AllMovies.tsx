import MovieCard from "./MovieCard";

interface Movie {
  id: number,
  title: string;
  poster_path: string;
  vote_average: number;
  original_language: string;
  release_date: string;
}

interface Movies {
  movies: Movie[];
}

export default function AllMovies({ movies }: Movies) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </div>
  );
}
