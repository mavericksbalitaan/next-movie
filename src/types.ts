export interface Movie {
  id?: number;
  title: string;
  poster_path: string;
  vote_average: number;
  original_language: string;
  release_date: string;
  overview?: string;
  backdrop_path?: string;
}

export interface Movies {
  movies: Movie[];
}

export interface ModalProps {
  movie: Movie;
  isModalOpen: boolean;
  handleClose: () => void;
}

export interface Clip {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}
