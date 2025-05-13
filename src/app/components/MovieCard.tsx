import Image from "next/image";
import Modal from "./Modal";
import { useState } from "react";
import { Movie } from "@/types";
import { useDispatch } from "react-redux";
import { addToFavorite } from "../redux/faveSlice";

export default function MovieCard({ movie }: { movie: Movie }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { title, poster_path, vote_average, original_language, release_date } =
    movie;

  return (
    <>
      <div>
        <div
          className="w-[300px] md:w-[200px] cursor-pointer"
          onClick={() => handleClick()}
        >
          <div className="overflow-hidden">
            <Image
              src={
                poster_path
                  ? `${process.env.NEXT_PUBLIC_IMG_URL}${poster_path}`
                  : "/no-movie.png"
              }
              width={500}
              height={500}
              alt={title}
              className="hover:scale-[1.05] duration-300"
            />
          </div>
          <h2 className="text-white">{title}</h2>
          <div className="flex gap-1">
            <Image src="/star.svg" alt="Star rating" width={16} height={16} />
            <p className="text-white">
              {vote_average ? vote_average.toFixed(1) : "N/A"}
            </p>
            <span className="text-white">•</span>
            <span className="text-gray-400">
              {original_language.charAt(0).toUpperCase() +
                original_language.slice(1)}
            </span>
            <span className="text-white">•</span>
            <span className="text-gray-400">{release_date.slice(0, 4)}</span>
          </div>
        </div>
        <p
          className="text-white cursor-pointer hover:text-yellow-500"
          onClick={() => dispatch(addToFavorite(movie))}
        >
          ❤️ Add to My Favorites
        </p>
      </div>
      <Modal
        movie={movie}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
      />
    </>
  );
}
