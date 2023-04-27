import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { addFav, fetchAnother, getFavsFromLocalStorage } from "./actions";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.loading);
  const current = useSelector((store) => store.current);
  const favs = useSelector((store) => store.favs);
  const onlist = useSelector((store) => store.onlist);

  useEffect(() => {
    dispatch(fetchAnother());
    dispatch(getFavsFromLocalStorage());
  }, []);

  const handleAddFavorite = () => {
    dispatch(addFav(current));
    setFavsChange(!favsChange); // Değişikliği tetikle
  };

  // console.log(current);
  const [favsChange, setFavsChange] = useState(true); // Yeni değişken tanımlama
  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && (
            <div className="bg-white  p-6 text-center shadow-md">
              YÜKLENİYOR
            </div>
          )}
          {current && !loading && <Item data={current} />}

          <div className="flex gap-3 justify-end py-3">
            <button
              onClick={() => dispatch(fetchAnother())}
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed "
              disabled={loading}
            >
              Başka bir tane
            </button>
            <button
              onClick={() => {
                dispatch(addFav(current));
                setFavsChange(!favsChange); // Değişikliği tetikle
                setTimeout(() => dispatch(fetchAnother()), 2500);
              }}
              disabled={onlist}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Favorilere ekle
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0 ? (
              favs.map((item) => <FavItem key={item.key} item={item} />)
            ) : (
              <div className="bg-white p-6 text-center shadow-md">
                Henüz bir favoriniz yok
              </div>
            )}
          </div>
        </Route>
      </Switch>
    </div>
  );
}
