import { useEffect, useState } from "react";
import useFavorites from "../context/useFavorites";
import { Link } from "react-router-dom";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [favoritesState, setFavoritesState] = useState({});
  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results || []);

        const favoritesStatus = {};
        for (let movie of data.results) {
          favoritesStatus[movie.id] = await isFavorite(movie.id);
        }
        setFavoritesState(favoritesStatus);
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error.message);
      }
    };

    fetchMovies();
  }, [API_TOKEN, isFavorite]);

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <Link to={`/movie/${movie.id}`}>
            <img src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"} alt={movie.title} />
          </Link>
          <div className="movie-info">
            <strong>{movie.title}</strong>
            <p>⭐ {movie.vote_average}</p>
            <button
              className="favorite-btn"
              onClick={async () => {
                if (favoritesState[movie.id]) {
                  await removeFavorite(movie.id);
                } else {
                  await addFavorite(movie);
                }
                setFavoritesState((prev) => ({
                  ...prev,
                  [movie.id]: !prev[movie.id],
                }));
              }}
            >
              {favoritesState[movie.id] ? "💔 Retirer" : "❤️ Ajouter"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
