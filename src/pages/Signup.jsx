import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../components/SocialLogin";

function Signup({ onLogin }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  function handleFormKeyDown(e) {
    if (e.key !== "Enter") {
      return;
    }

    const current = e.target;

    if (current === nameRef.current) {
      e.preventDefault();

      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }

      setError("");
      emailRef.current.focus();
      return;
    }

    if (current === emailRef.current) {
      e.preventDefault();

      if (!email.trim()) {
        setError("Please enter your email.");
        return;
      }

      setError("");
      passwordRef.current.focus();
      return;
    }

    if (current === passwordRef.current) {
      e.preventDefault();

      if (!password) {
        setError("Please enter your password.");
        return;
      }

      setError("");
      confirmPasswordRef.current.focus();
      return;
    }

    if (current === confirmPasswordRef.current) {
      e.preventDefault();
      handleSignup();
    }
  }

  function handleSignup() {
    if (!name.trim()) {
      setError("Please enter your name.");
      nameRef.current.focus();
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      emailRef.current.focus();
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      passwordRef.current.focus();
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password.");
      confirmPasswordRef.current.focus();
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      confirmPasswordRef.current.focus();
      return;
    }

    const savedUser = localStorage.getItem("movieUser");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        if (
          user.email?.trim().toLowerCase() ===
          email.trim().toLowerCase()
        ) {
          setError(
            "An account with this email already exists."
          );

          emailRef.current.focus();
          return;
        }
      } catch {
        localStorage.removeItem("movieUser");
      }
    }

    const user = {
      name: name.trim(),
      email: email.trim(),
      password,
    };

    localStorage.setItem(
      "movieUser",
      JSON.stringify(user)
    );

    onLogin(user);

    setError("");

    navigate("/", {
      replace: true,
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
        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join MovieFlix
        </p>

        <form
          onKeyDown={handleFormKeyDown}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >

          {/* NAME */}
          <div className="form-group">
            <label htmlFor="signup-name">
              Name
            </label>

            <input
              ref={nameRef}
              id="signup-name"
              type="text"
              placeholder="Enter your name"
              value={name}
              autoComplete="name"
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label htmlFor="signup-email">
              Email
            </label>

            <input
              ref={emailRef}
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label htmlFor="signup-password">
              Password
            </label>

            <input
              ref={passwordRef}
              id="signup-password"
              type="password"
              placeholder="Create a password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="form-group">
            <label htmlFor="signup-confirm-password">
              Confirm Password
            </label>

            <input
              ref={confirmPasswordRef}
              id="signup-confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          {/* CREATE ACCOUNT */}
          <button
            type="button"
            className="auth-button"
            onClick={handleSignup}
          >
            Create Account
          </button>

        </form>

        {/* SOCIAL LOGIN */}
        <SocialLogin onLogin={onLogin} />

        {/* LOGIN */}
        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">
            Login
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

export default Signup;