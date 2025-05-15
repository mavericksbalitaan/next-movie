import { Movie } from "@/types";

export const fetchMovies = async (
  page: number = 1,
  query: string = "",
): Promise<Movie[] | string> => {
  const endpoint = query
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/search/movie?page=${page}&query=${encodeURIComponent(query)}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie?page=${page}&include_adult=false&sort_by=popularity.desc`;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  };

  try {
    const response = await fetch(endpoint, API_OPTIONS);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (err: unknown) {
    console.error(`Error fetching movies ${err}`);
    let errorMessage = "An unknown error occurred";
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === "string") {
      errorMessage = err;
    }
    return errorMessage;
  }
};
