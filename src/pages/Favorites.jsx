import { Link } from "react-router-dom";


function Favorites({
  favorites,
  removeFavorite,
}) {

  return (
    <main className="favorites-page">

      <h1>
        ❤️ My Favorites
      </h1>

      {favorites.length === 0 ? (

        <div className="empty-favorites">

          <div className="empty-icon">
            ❤️
          </div>

          <h2>
            No favorite movies yet 😔
          </h2>

          <p>
            Go back to Home and add some movies
            to your favorites.
          </p>

          <Link
            to="/"
            className="details-button browse-button"
          >
            🎬 Browse Movies
          </Link>

        </div>

      ) : (

        <div className="movie-grid">

          {favorites.map((movie) => (

            <div
              className="movie-card"
              key={movie.id}
            >

              <img
                src={movie.image}
                alt={movie.title}
              />

              <div className="movie-info">

                <h2>
                  {movie.title}
                </h2>

                <p>
                  📅 {movie.year}
                </p>

                <p>
                  🎭 {movie.genre}
                </p>

                <p>
                  ⭐ {movie.rating}
                </p>

                <Link
                  to={`/movie/${movie.id}`}
                  className="details-button"
                >
                  View Details
                </Link>

                <button
                  className="favorite-button active"
                  onClick={() =>
                    removeFavorite(movie.id)
                  }
                >
                  💔 Remove Favorite
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}

export default Favorites;