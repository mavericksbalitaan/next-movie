import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Clip } from "@/types";

export default function Video({ movie_id }: { movie_id: number | undefined }) {
  const [vid_key, setVidKey] = useState<number | null>(null);

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
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <>
      <ReactPlayer url={`${yt_url}${vid_key}`} />
    </>
  );
}
