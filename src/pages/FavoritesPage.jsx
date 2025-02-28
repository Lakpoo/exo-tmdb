import useFavorites from "../context/useFavorites";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movies-grid">
      {favorites.length > 0 ? (
        favorites.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`}>
              <img src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"} alt={movie.title} />
            </Link>
            <div className="movie-info">
              <strong>{movie.title}</strong>
              <p>⭐ {movie.vote_average}</p>
              <button className="favorite-btn" onClick={() => removeFavorite(movie.id)}>
                💔 Retirer
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Aucun film en favoris.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
