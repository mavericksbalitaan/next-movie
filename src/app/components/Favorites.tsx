import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import FavoriteCard from "./FavoriteCard";

export default function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites);

  if (favorites.length === 0) {
    return <p className="text-white">No favorites yet.</p>;
  }

  return (
    <div className="flex gap-x-24 overflow-x-scroll overflow-y-hidden">
      {favorites.map((fave, idx) => (
        <FavoriteCard key={fave.id} movie={fave} rank={idx + 1} />
      ))}
    </div>
  );
}
