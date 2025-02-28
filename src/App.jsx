import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MoviesList from "./components/MoviesList";
import SearchResults from "./pages/SearchResults";
import Genres from "./pages/Genres";
import FavoritesPage from "./pages/FavoritesPage";
import MovieDetails from "./pages/MoviesDetails";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./App.css";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/categories" element={<Genres />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
