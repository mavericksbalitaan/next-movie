import Image from "next/image";

export default function Hero() {
  return (
    <div className="bg-black h-[70vh] min-w-screen md:h-screen flex flex-col justify-center items-center bg-[url('/hero-bg.png')]">
      <Image
        src="/hero.png"
        width={700}
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
  );
}
