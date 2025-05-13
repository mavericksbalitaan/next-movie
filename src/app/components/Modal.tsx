import Image from "next/image";
import { ModalProps } from "@/types";
import Video from "./Video";

export default function Modal({ movie, isModalOpen, handleClose }: ModalProps) {
  const {
    title,
    backdrop_path,
    vote_average,
    original_language,
    release_date,
    overview,
    id,
  } = movie;

  if (!isModalOpen) {
    return null;
  }

  return (
    <div
      className="backdrop-blur-sm flex flex-col max-w-screen max-h-screen fixed inset-0 justify-center items-center"
      onClick={handleClose}
    >
      <div className="flex flex-col p-4 items-center w-[100vw] md:items-center md:justify-center bg-black text-white md:border-5 border-solid  md:border-yellow-400 md:w-[90vw] md:h-[90vh] rounded-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:w-[80vw] md:items-start">
          <div className="flex flex-col">
            <Image
              src={
                backdrop_path
                  ? `${process.env.NEXT_PUBLIC_IMG_URL}${backdrop_path}`
                  : "/no-movie.png"
              }
              width={500}
              height={500}
              alt={title}
              className="min-w-[400px]"
              draggable={false}
            />
            <div className="flex gap-1">
              <Image src="/star.svg" width={16} height={16} alt="star svg" draggable={false} />
              <p className="text-wite">
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

          <div className="flex flex-col">
            <h1 className="text-2xl montserrat-bold mt-2">{title}</h1>
            <p>Overview:</p>
            <p className="italic w-full md:w-full">{overview}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <Video movie_id={id} />
        </div>
      </div>
    </div>
  );
}
