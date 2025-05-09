import Image from "next/image";

interface TrendingMovie {
  title: string;
  poster_path: string;
}

export default function TrendingCard({
  movie,
  rank,
}: {
  movie: TrendingMovie;
  rank: number;
}) {
  const { title, poster_path } = movie;

  if (rank > 10) {
    return;
  }

  return (
    <div className="flex flex-row items-center">
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
      />
    </div>
  );
}
