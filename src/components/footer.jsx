import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="movie-footer">

      <div className="movie-footer-container">

        {/* =========================
            BRAND
        ========================= */}

        <div className="movie-footer-brand">

          <h2 className="movie-footer-logo">
            🎬 Movie Explorer
          </h2>

          <p>
            Discover movies, save your favorites,
            and find your next movie to watch.
          </p>

          <div className="movie-footer-socials">

            <button type="button" title="Instagram">
              📸
            </button>

            <button type="button" title="YouTube">
              ▶️
            </button>

            <button type="button" title="Twitter">
              🐦
            </button>

          </div>

        </div>


        {/* =========================
            EXPLORE
        ========================= */}

        <div className="movie-footer-column">

          <h3>
            Explore
          </h3>

          <Link to="/">
            🏠 Home
          </Link>

          <Link to="/">
            🎬 All Movies
          </Link>

          <Link to="/">
            ❤️ Love Movies
          </Link>

          <Link to="/">
            🔥 Action Movies
          </Link>

          <Link to="/">
            😱 Thriller Movies
          </Link>

          <Link to="/">
            🚀 Sci-Fi Movies
          </Link>

          <Link to="/">
            😂 Comedy Movies
          </Link>

          <Link to="/favorites">
            ⭐ My Favorites
          </Link>

        </div>


        {/* =========================
            ACCOUNT
        ========================= */}

        <div className="movie-footer-column">

          <h3>
            Account
          </h3>

          <Link to="/login">
            🔐 Login
          </Link>

          <Link to="/signup">
            📝 Signup
          </Link>

          <Link to="/profiles">
            👤 Profiles
          </Link>

          <Link to="/favorites">
            ❤️ Favorites
          </Link>

          <Link to="/premium">
            👑 Premium
          </Link>

        </div>


        {/* =========================
            SUPPORT
        ========================= */}

        <div className="movie-footer-column">

          <h3>
            Support
          </h3>

          <button type="button">
            ℹ️ About Us
          </button>

          <button type="button">
            📩 Contact Us
          </button>

          <button type="button">
            ❓ Help Center
          </button>

          <button type="button">
            💬 Feedback
          </button>

          <button type="button">
            🔒 Privacy Policy
          </button>

          <button type="button">
            📜 Terms & Conditions
          </button>

          <button type="button">
            🛠️ Report a Problem
          </button>

        </div>

      </div>


      {/* =========================
          DIVIDER
      ========================= */}

      <div className="movie-footer-divider" />


      {/* =========================
          BOTTOM
      ========================= */}

      <div className="movie-footer-bottom">

        <span>
          © 2026 Movie Explorer
        </span>

        <span>
          Made with ❤️ for movie lovers
        </span>

      </div>

    </footer>
  );
}

export default Footer;