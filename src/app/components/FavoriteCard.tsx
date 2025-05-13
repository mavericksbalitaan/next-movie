import Image from "next/image";
import { Movie } from "@/types";
import { useState } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { deleteFromFavorite } from "../redux/faveSlice";

export default function FavoriteCard({
  movie,
  rank,
}: {
  movie: Movie;
  rank: number;
}) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { title, poster_path } = movie;

  if (rank > 10) {
    return;
  }

  return (
    <>
      <div>
        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={handleClick}
        >
          <Image
            src={
              poster_path
                ? `${process.env.NEXT_PUBLIC_IMG_URL}${poster_path}`
                : "/no-movie.png"
            }
            width={150}
            height={150}
            alt={title}
            className="hover:border-white hover:border-[5px] duration-300 max-w-[125px]"
          />
        </div>
        <p
          className="text-white text-center cursor-pointer hover:text-yellow-500"
          onClick={() => dispatch(deleteFromFavorite(movie))}
        >
          ⛔ Remove
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
