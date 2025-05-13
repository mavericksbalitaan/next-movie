import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@/types";

interface FavoritesState {
  favorites: Movie[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const faveSlice = createSlice({
  name: "favorites",
  initialState: initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<Movie>) => {
      const exists = state.favorites.some(
        (fave) => fave.id === action.payload.id,
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    deleteFromFavorite: (state, action: PayloadAction<Movie>) => {
      state.favorites = state.favorites.filter(
        (fave) => fave.id !== action.payload.id,
      );
    },
  },
});

export const { addToFavorite, deleteFromFavorite } = faveSlice.actions;
export default faveSlice.reducer;
