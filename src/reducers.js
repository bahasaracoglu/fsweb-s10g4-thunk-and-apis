import { toast } from "react-toastify";

import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  fetchAnother,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
  onlist: false,
};

function writeFavsToLocalStorage(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("favorites"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      const isAlreadyInFavorites = state.favs.some(
        (item) => item === action.payload
      );
      if (isAlreadyInFavorites) {
        return { ...state, onlist: true };
      } else {
        const updatedState = {
          ...state,
          favs: [...state.favs, action.payload],
          onlist: true,
        };

        writeFavsToLocalStorage(updatedState.favs);
        toast.success("Favorilere eklendi!");

        return updatedState;
      }

    case FAV_REMOVE:
      return {
        ...state,
        favs: state.favs.filter((item) => item.key !== action.payload),
      };

    case FETCH_SUCCESS:
      return { ...state, current: action.payload, onlist: false };

    case FETCH_LOADING:
      return { ...state, loading: action.payload };

    case FETCH_ERROR:
      return { ...state, error: action.payload };

    case GET_FAVS_FROM_LS:
      const savedFavs = readFavsFromLocalStorage();
      if (savedFavs) {
        const updatedState = { ...state, favs: savedFavs };
        return updatedState;
      } else {
        return state;
      }
    default:
      return state;
  }
}
