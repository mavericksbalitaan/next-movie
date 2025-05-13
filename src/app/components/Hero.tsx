import Image from "next/image";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <div>
      <div className="bg-black min-h-[60vh] md:min-h-screen flex flex-col justify-center items-center bg-[url('/hero-bg.png')]">
        <Image
          src="/hero.png"
          width={600}
          height={100}
          alt="Hero Image"
          draggable={false}
        />
        <h1 className="text-white text-5xl text-center mt-4">
          🎬 Your Ultimate{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-t from-white to-purple-950">
            Movie{" "}
          </span>
          Database
        </h1>
      </div>
      <div className="min-h-screen bg-black flex flex-col items-center pb-32">
        <SearchBar />
      </div>
    </div>
  );
}
