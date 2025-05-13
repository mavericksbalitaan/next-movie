import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import FavoriteCard from "./FavoriteCard";
import DownloadFile from "./DownloadFile";

export default function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites);

  if (favorites.length === 0) {
    return <p className="text-white">No favorites yet.</p>;
  }

  return (
    <>
      <DownloadFile />
      <div className="flex gap-x-24 max-w-screen overflow-x-scroll overflow-y-hidden">
        {favorites.map((fave, idx) => (
          <FavoriteCard key={fave.id} movie={fave} rank={idx + 1} />
        ))}
      </div>
    </>
  );
}
