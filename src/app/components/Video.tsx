import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Clip } from "@/types";
import Image from "next/image";

export default function Video({ movie_id }: { movie_id: number | undefined }) {
  const [vid_key, setVidKey] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const yt_url = "https://www.youtube.com/watch?v=";

  const fetchVideos = useCallback(async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${movie_id}/videos?language=en-US`;

    const API_OPTIONS = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    };

    try {
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      const clips = data.results.filter((vid: Clip) => vid.type !== "");
      setVidKey(clips[0].key);
    } catch (err) {
      console.log(`Error fetching videos: ${err}`);
      setErrorMessage("Error fetching videos");
    }
  }, [movie_id]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <>
      {errorMessage ? (
        <Image
          src="https://dummyimage.com/300x200/000/fff&text=No+Available+Video+Found."
          width={300}
          height={200}
          alt="no video"
          draggable={false}
        />
      ) : (
        <ReactPlayer url={`${yt_url}${vid_key}`} />
      )}
    </>
  );
}
