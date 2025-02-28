import { useEffect, useState } from "react";
import useFavorites from "../context/useFavorites";
import { Link } from "react-router-dom";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);

  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=fr-FR", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        setGenres(data.genres);
        if (data.genres.length > 0) {
          setSelectedGenre(data.genres[0].id);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des genres :", error.message);
      }
    };

    fetchGenres();
  }, [API_TOKEN]);

  useEffect(() => {
    if (!selectedGenre) return;

    const fetchMoviesByGenre = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}&language=fr-FR`, {
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
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error.message);
      }
    };

    fetchMoviesByGenre();
  }, [API_TOKEN, selectedGenre]);

  return (
    <div className="genres-container">
      <div className="genres-list">
        {genres.map((genre) => (
          <button key={genre.id} className={genre.id === selectedGenre ? "genre-button active" : "genre-button"} onClick={() => setSelectedGenre(genre.id)}>
            {genre.name}
          </button>
        ))}
      </div>

      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`}>
              <img src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"} alt={movie.title} />
            </Link>
            <div className="movie-info">
              <strong>{movie.title}</strong>
              <p>⭐ {movie.vote_average}</p>
              <button className="favorite-btn" onClick={() => (isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie))}>
                {isFavorite(movie.id) ? "💔 Retirer" : "❤️ Ajouter"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
