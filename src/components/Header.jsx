import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery("");
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          🎬 MovieDB
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/categories">Genres</Link>
          </li>
          <li>
            <Link to="/favorites">Favoris</Link>
          </li>
        </ul>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Rechercher un film..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit">🔍</button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
