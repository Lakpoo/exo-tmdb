import { openDB } from "idb";

const initDB = async () => {
  return openDB("movieDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("favorites")) {
        db.createObjectStore("favorites", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("ratings")) {
        db.createObjectStore("ratings", { keyPath: "movieId" });
      }
      if (!db.objectStoreNames.contains("comments")) {
        db.createObjectStore("comments", { keyPath: "movieId" });
      }
    },
  });
};

export const addFavoriteDB = async (movie) => {
  const db = await initDB();
  return db.put("favorites", movie);
};

export const removeFavoriteDB = async (movieId) => {
  const db = await initDB();
  return db.delete("favorites", movieId);
};

export const getFavoritesDB = async () => {
  const db = await initDB();
  return db.getAll("favorites");
};

export const isFavoriteDB = async (movieId) => {
  const db = await initDB();
  return (await db.get("favorites", movieId)) ? true : false;
};

export const rateMovieDB = async (movieId, rating) => {
  const db = await initDB();
  return db.put("ratings", { movieId, rating });
};

export const getRatingDB = async (movieId) => {
  const db = await initDB();
  const data = await db.get("ratings", movieId);
  return data ? data.rating : 0;
};

export const addCommentDB = async (movieId, comment) => {
  const db = await initDB();
  const existingComments = (await db.get("comments", movieId)) || { movieId, comments: [] };
  existingComments.comments.push(comment);
  return db.put("comments", existingComments);
};

export const getCommentsDB = async (movieId) => {
  const db = await initDB();
  const data = await db.get("comments", movieId);
  return data ? data.comments : [];
};

export const removeCommentDB = async (movieId, commentIndex) => {
  const db = await initDB();
  const data = await db.get("comments", movieId);

  if (data) {
    data.comments.splice(commentIndex, 1);
    await db.put("comments", data);
  }
};
