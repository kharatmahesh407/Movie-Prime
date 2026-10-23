import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Registered user check
    const savedUser = localStorage.getItem("movieUser");

    if (!savedUser) {
      setError("No account found. Please sign up first.");
      return;
    }

    let user;

    try {
      user = JSON.parse(savedUser);
    } catch {
      setError("Something went wrong. Please try again.");
      return;
    }

    // Check email
    if (
      user.email.trim().toLowerCase() !==
      email.trim().toLowerCase()
    ) {
      setError("No account found with this email.");
      return;
    }

    // Save email temporarily for password reset
    localStorage.setItem(
      "resetEmail",
      user.email
    );

    // Go to reset password page
    navigate("/reset-password");
  }

  return (
    <main className="auth-page">

      <div className="auth-card">

        <div className="auth-icon">
          🔐
        </div>

        <h1>Forgot Password?</h1>

        <p className="auth-subtitle">
          Enter your registered email address
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label htmlFor="forgot-email">
              Email
            </label>

            <input
              id="forgot-email"
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

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-button"
          >
            Continue
          </button>

        </form>

        <p className="auth-switch">

          Remember your password?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

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

export default ForgotPassword;