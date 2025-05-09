export interface Movie {
  id?: number;
  title: string;
  poster_path: string;
  vote_average: number;
  original_language: string;
  release_date: string;
  overview?: string;
}

export interface Movies {
  movies: Movie[];
}

export interface Modal {
  movie: Movie;
  isModalOpen: string;
}

export interface TrendingMovie {
  title: string;
  poster_path: string;
}

export interface ModalProps {
  movie: Movie;
  isModalOpen: boolean;
  handleClose: () => void;
}
