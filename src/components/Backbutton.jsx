import { useNavigate, useLocation } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Home page वर Back button दाखवू नका
  if (location.pathname === "/") {
    return null;
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <button
      type="button"
      className="back-button"
      onClick={handleBack}
    >
      ← Back
    </button>
  );
}

export default BackButton;