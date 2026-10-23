import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleResetPassword(e) {
  e.preventDefault();

  setError("");
  setSuccess("");

  // Check fields
  if (!password || !confirmPassword) {
    setError("Please enter both password fields.");
    return;
  }

  // Check password length
  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  // Check passwords match
  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  // Get reset email
  const resetEmail = localStorage.getItem("resetEmail");

  if (!resetEmail) {
    setError(
      "Reset session expired. Please try again."
    );
    return;
  }

  // Get saved user
  const savedUser = localStorage.getItem("movieUser");

  if (!savedUser) {
    setError("User account not found.");
    return;
  }

  let user;

  try {
    user = JSON.parse(savedUser);
  } catch {
    setError("Something went wrong. Please try again.");
    return;
  }

  // Verify email
  if (
    user.email.trim().toLowerCase() !==
    resetEmail.trim().toLowerCase()
  ) {
    setError("User account not found.");
    return;
  }

  // Check previous password
  if (password === user.password) {
    setError(
      "You cannot use your previous password. Please enter a new password."
    );
    return;
  }

  // Update password
  user.password = password;

  // Save updated user
  localStorage.setItem(
    "movieUser",
    JSON.stringify(user)
  );

  // Remove reset email
  localStorage.removeItem("resetEmail");

  setSuccess(
    "Password reset successfully!"
  );

  // Go to login
  setTimeout(() => {
    navigate("/login");
  }, 1500);
}
  return (
    <main className="auth-page">

      <div className="auth-card">

        <div className="auth-icon">
          🔐
        </div>

        <h1>Reset Password</h1>

        <p className="auth-subtitle">
          Create a new password for your account
        </p>

        <form onSubmit={handleResetPassword}>

          {/* New Password */}
          <div className="form-group">

            <label htmlFor="new-password">
              New Password
            </label>

            <input
              id="new-password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoComplete="new-password"
            />

          </div>


          {/* Confirm Password */}
          <div className="form-group">

            <label htmlFor="confirm-password">
              Confirm Password
            </label>

            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              autoComplete="new-password"
            />

          </div>


          {/* Error */}
          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}


          {/* Success */}
          {success && (
            <p className="auth-success">
              {success}
            </p>
          )}


          {/* Button */}
          <button
            type="submit"
            className="auth-button"
          >
            Reset Password
          </button>

        </form>

      </div>

    </main>
  );
}

export default ResetPassword;