import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { addFavoriteDB, removeFavoriteDB, getFavoritesDB, isFavoriteDB } from "../utils/db";

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await getFavoritesDB();
      setFavorites(storedFavorites);
    };
    loadFavorites();
  }, []);

  const addFavorite = async (movie) => {
    await addFavoriteDB(movie);
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFavorite = async (movieId) => {
    await removeFavoriteDB(movieId);
    setFavorites((prev) => prev.filter((fav) => fav.id !== movieId));
  };

  const isFavorite = async (movieId) => {
    return await isFavoriteDB(movieId);
  };

  return <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>{children}</FavoritesContext.Provider>;
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FavoritesContext, FavoritesProvider };
