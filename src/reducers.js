import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
  onlist: false,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
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
        return {
          ...state,
          favs: [...state.favs, action.payload],
          onlist: true,
        };
      }

    case FAV_REMOVE:
      return {
        ...state,
        favs: state.favs.filter((item) => item.key !== action.payload),
      };

    case FETCH_SUCCESS:
      console.log("fetchsucces", action.payload);
      return { ...state, current: action.payload, onlist: false };

    case FETCH_LOADING:
      return { ...state, loading: action.payload };

    case FETCH_ERROR:
      return { ...state, error: action.payload };

    case GET_FAVS_FROM_LS:
      return state;

    default:
      return state;
  }
}
