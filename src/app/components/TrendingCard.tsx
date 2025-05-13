import Image from "next/image";
import { Movie } from "@/types";
import { useState } from "react";
import Modal from "./Modal";

export default function TrendingCard({
  movie,
  rank,
}: {
  movie: Movie;
  rank: number;
}) {
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
      <div className="flex flex-row items-center cursor-pointer" onClick={handleClick}>
        <span className="text-transparent text-[200px] h-[250px] bg-clip-text bg-gradient-to-r from-white to-purple-950">
          {rank}
        </span>
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
          draggable={false}
        />
      </div>
      <Modal
        movie={movie}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
      />
    </>
  );
}
