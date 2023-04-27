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
      return state;

    case FAV_REMOVE:
      return state;

    case FETCH_SUCCESS:
      console.log("fetchsucces", action.payload);
      return { ...state, current: action.payload };

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
