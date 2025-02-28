import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFavorites from "../context/useFavorites";
import { rateMovieDB, getRatingDB, addCommentDB, getCommentsDB } from "../utils/db";
import { removeCommentDB } from "../utils/db";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=fr-FR`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        setMovie(data);
        setIsFav(await isFavorite(data.id));
        setRating(await getRatingDB(data.id));
        setComments(await getCommentsDB(data.id));
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du film :", error.message);
      }
    };

    fetchMovieDetails();
  }, [API_TOKEN, isFavorite, id]);

  const handleRating = async (value) => {
    await rateMovieDB(movie.id, value);
    setRating(value);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    await addCommentDB(movie.id, newComment);
    setComments([...comments, newComment]);
    setNewComment("");
  };

  const handleRemoveComment = async (index) => {
    await removeCommentDB(movie.id, index);
    const updatedComments = await getCommentsDB(movie.id);
    setComments(updatedComments);
  };

  if (!movie) return <p>Chargement...</p>;

  return (
    <div className="movie-details">
      <img src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"} alt={movie.title} />
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p>
          <strong>⭐ Note :</strong> {movie.vote_average}
        </p>
        <p>
          <strong>📅 Date de sortie :</strong> {movie.release_date}
        </p>
        <p>
          <strong>📜 Synopsis :</strong> {movie.overview || "Aucune description disponible."}
        </p>

        <div className="rating">
          <strong>📝 Notez ce film :</strong>
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={star <= rating ? "star filled" : "star"} onClick={() => handleRating(star)}>
              {star <= rating ? "⭐" : "☆"}
            </span>
          ))}
        </div>

        <button
          className="favorite-btn"
          onClick={async () => {
            if (isFav) {
              await removeFavorite(movie.id);
            } else {
              await addFavorite(movie);
            }
            setIsFav(!isFav);
          }}
        >
          {isFav ? "💔 Retirer des favoris" : "❤️ Ajouter aux favoris"}
        </button>

        <div className="comments-section">
          <h2>💬 Commentaires</h2>
          <ul>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <li key={index}>
                  {comment}
                  <button className="delete-comment-btn" onClick={() => handleRemoveComment(index)}>
                    🗑️
                  </button>
                </li>
              ))
            ) : (
              <p>Aucun commentaire.</p>
            )}
          </ul>
          <textarea placeholder="Ajoutez un commentaire..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <button onClick={handleAddComment}>Envoyer</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
