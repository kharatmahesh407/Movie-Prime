import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SocialLogin from "../components/SocialLogin";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }

    const savedUser = localStorage.getItem("movieUser");

    if (!savedUser) {
      setError("No account found. Please sign up first.");
      return;
    }

    let user;

    try {
      user = JSON.parse(savedUser);
    } catch {
      setError("Something went wrong. Please sign up again.");
      return;
    }

    if (
      !user.email ||
      user.email.trim().toLowerCase() !==
        email.trim().toLowerCase()
    ) {
      setError("Invalid email or password.");
      return;
    }

    if (user.password !== password) {
      setError("Invalid email or password.");
      return;
    }

    onLogin(user);

    navigate("/profiles", {
      replace: true,
      state: {
        from: location.state?.from || "/",
      },
    });
  }

  return (
    <main className="auth-page">
      <div className="auth-card">

        {/* WEBSITE LOGO + NAME */}
        <div className="auth-brand">
          <div className="auth-brand-icon">
            🎬
          </div>

          <div className="auth-brand-name">
            <span>Movie</span>Flix
          </div>

          <div className="auth-brand-line" />
        </div>

        {/* TITLE */}
        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to MovieFlix
        </p>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div className="form-group">
            <label htmlFor="login-email">
              Email
            </label>

            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              autoComplete="email"
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label htmlFor="login-password">
              Password
            </label>

            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoComplete="current-password"
            />

            <Link
              to="/forgot-password"
              className="forgot-password"
            >
              Forgot Password?
            </Link>
          </div>

          {/* ERROR */}
          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          {/* LOGIN */}
          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

          {/* SOCIAL LOGIN */}
          <SocialLogin onLogin={onLogin} />

        </form>

        {/* SIGN UP */}
        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>

        {/* BACK */}
        <Link
          to="/"
          className="auth-back"
        >
          ← Back to Movies
        </Link>

      </div>
    </main>
  );
}

export default Login;