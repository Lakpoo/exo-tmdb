# Application de Films avec TMDB

Une application web React qui utilise l'API TMDB

## Prérequis

- Node.js (version 14 ou supérieure)
- npm
- Un compte TMDB et un Access Token

## Installation

1. Clonez le repository

```bash
git clone <url-du-repo>
cd exo-tmdb
```

2. Installez les dépendances

```bash
npm install
```

3. Configuration des variables d'environnement
   - Renommez le fichier `.env.example` en `.env`
   - Remplacez `votre_access_token_ici` par votre Access Token TMDB

```env
VITE_TMDB_ACCESS_TOKEN=votre_access_token_ici
```

## Lancement du projet

Pour démarrer l'application en mode développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

## Structure du projet

    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── .env.example
    ├── public/
    └── src/
        ├── App.css
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── components/
        │   ├── Header.jsx
        │   └── MoviesList.jsx
        ├── context/
        │   ├── FavoritesContext.jsx
        │   └── useFavorites.js
        ├── pages/
        │   ├── FavoritesPage.jsx
        │   ├── Genres.jsx
        │   ├── MoviesDetails.jsx
        │   └── SearchResults.jsx
        └── utils/
            └── db.js
