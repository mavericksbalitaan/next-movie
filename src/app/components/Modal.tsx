import Image from "next/image";
import { ModalProps } from "@/types";

export default function Modal({ movie, isModalOpen, handleClose }: ModalProps) {
  const {
    title,
    poster_path,
    vote_average,
    original_language,
    release_date,
    overview,
  } = movie;

  if (!isModalOpen) {
    return null;
  }

  return (
    <div
      className="backdrop-blur-sm flex flex-col max-w-screen max-h-screen fixed inset-0 justify-center items-center"
      onClick={handleClose}
    >
      <div className="flex flex-col p-4 items-center w-[90vw] md:items-center md:justify-center bg-black text-white border-5 border-solid  border-yellow-400 md:w-[50vw] md:h-[90vh] rounded-2xl">
        <div className="flex flex-col">
          <Image
            src={
              poster_path
                ? `${process.env.NEXT_PUBLIC_IMG_URL}${poster_path}`
                : "/no-movie.png"
            }
            width={300}
            height={300}
            alt={title}
            className=""
          />
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

        <div className="flex flex-col">
          <h1 className="text-2xl montserrat-bold mt-2">{title}</h1>
          <p>Overview:</p>
          <p className="italic">{overview}</p>
        </div>
      </div>
    </div>
  );
}
