import { useState, useEffect, useRef } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function SocialLogin({ onLogin }) {
  const navigate = useNavigate();

  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);

  const recaptchaRef = useRef(null);

  // =========================================
  // GOOGLE LOGIN
  // =========================================

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(
        auth,
        provider
      );

      const firebaseUser = result.user;

      const user = {
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email || "",
        photo: firebaseUser.photoURL || "",
        provider: "google",
      };

      localStorage.setItem(
        "movieUser",
        JSON.stringify(user)
      );

      onLogin(user);

      navigate("/", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "Google Login Error:",
        error
      );
    }
  }

  // =========================================
  // RECAPTCHA
  // =========================================

  function setupRecaptcha() {
    if (window.recaptchaVerifier) {
      return window.recaptchaVerifier;
    }

    if (!recaptchaRef.current) {
      throw new Error(
        "reCAPTCHA container not found."
      );
    }

    window.recaptchaVerifier =
      new RecaptchaVerifier(
        auth,
        recaptchaRef.current,
        {
          size: "normal",

          callback: () => {
            console.log(
              "reCAPTCHA verified"
            );
          },

          "expired-callback": () => {
            setPhoneError(
              "reCAPTCHA expired. Please try again."
            );
          },
        }
      );

    return window.recaptchaVerifier;
  }

  // =========================================
  // SEND OTP
  // =========================================

  async function handleSendOTP() {
    setPhoneError("");

    if (!phone.trim()) {
      setPhoneError(
        "Please enter your phone number."
      );
      return;
    }

    let formattedPhone =
      phone.trim();

    if (
      formattedPhone.startsWith("0")
    ) {
      formattedPhone =
        "+91" +
        formattedPhone.substring(1);
    } else if (
      /^[6-9]\d{9}$/.test(
        formattedPhone
      )
    ) {
      formattedPhone =
        "+91" + formattedPhone;
    }

    if (
      !formattedPhone.startsWith("+")
    ) {
      setPhoneError(
        "Please enter a valid phone number."
      );
      return;
    }

    try {
      setLoading(true);

      const appVerifier =
        setupRecaptcha();

      const result =
        await signInWithPhoneNumber(
          auth,
          formattedPhone,
          appVerifier
        );

      setConfirmationResult(result);

      setPhoneError("");

      console.log(
        "OTP sent successfully"
      );

    } catch (error) {
      console.error(
        "Phone Login Error:",
        error
      );

      setPhoneError(
        error.message ||
        "Unable to send OTP."
      );

      if (
        window.grecaptcha &&
        window.recaptchaVerifier
      ) {
        try {
          const widgetId =
            await window.recaptchaVerifier.render();

          window.grecaptcha.reset(
            widgetId
          );
        } catch {
          // Ignore reset error
        }
      }

    } finally {
      setLoading(false);
    }
  }

  // =========================================
  // VERIFY OTP
  // =========================================

  async function handleVerifyOTP() {
    setPhoneError("");

    if (!otp.trim()) {
      setPhoneError(
        "Please enter the OTP."
      );
      return;
    }

    if (!confirmationResult) {
      setPhoneError(
        "Please request an OTP first."
      );
      return;
    }

    try {
      setLoading(true);

      const result =
        await confirmationResult.confirm(
          otp.trim()
        );

      const firebaseUser =
        result.user;

      const user = {
        name:
          firebaseUser.displayName ||
          "User",

        email:
          firebaseUser.email || "",

        phone:
          firebaseUser.phoneNumber ||
          "",

        photo:
          firebaseUser.photoURL || "",

        provider: "phone",
      };

      localStorage.setItem(
        "movieUser",
        JSON.stringify(user)
      );

      onLogin(user);

      navigate("/", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "OTP Verification Error:",
        error
      );

      setPhoneError(
        "Invalid OTP. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  // =========================================
  // CLEANUP
  // =========================================

  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch {
          // Ignore cleanup error
        }

        window.recaptchaVerifier = null;
      }
    };
  }, []);

  // =========================================
  // PHONE LOGIN
  // =========================================

  if (showPhoneLogin) {
    return (
      <div className="social-login">

        <div className="auth-divider">
          <span>PHONE LOGIN</span>
        </div>

        {!confirmationResult ? (

          <div className="phone-login-form">

            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError("");
              }}
              autoComplete="tel"
            />

            <div
              ref={recaptchaRef}
              className="recaptcha-container"
            ></div>

            {phoneError && (
              <p className="auth-error">
                {phoneError}
              </p>
            )}

            <button
              type="button"
              className="auth-button"
              onClick={handleSendOTP}
              disabled={loading}
            >
              {loading
                ? "Sending OTP..."
                : "Send OTP"}
            </button>

          </div>

        ) : (

          <div className="phone-login-form">

            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => {
                setOtp(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                );

                setPhoneError("");
              }}
            />

            {phoneError && (
              <p className="auth-error">
                {phoneError}
              </p>
            )}

            <button
              type="button"
              className="auth-button"
              onClick={handleVerifyOTP}
              disabled={loading}
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>

          </div>

        )}

        <button
          type="button"
          className="social-back-button"
          onClick={() => {
            setShowPhoneLogin(false);
            setConfirmationResult(null);
            setOtp("");
            setPhone("");
            setPhoneError("");
          }}
        >
          ← Back to Social Login
        </button>

      </div>
    );
  }

  // =========================================
  // SOCIAL BUTTONS
  // =========================================

  return (
    <div className="social-login">

      <div className="auth-divider">
        <span>OR</span>
      </div>

      {/* GOOGLE */}

      <button
        type="button"
        className="social-button google-button"
        onClick={handleGoogleLogin}
      >
        <i className="fa-brands fa-google social-icon google-icon"></i>

        <span>
          Continue with Google
        </span>
      </button>

      {/* PHONE */}

      <button
        type="button"
        className="social-button phone-button"
        onClick={() => {
          setShowPhoneLogin(true);
          setPhoneError("");
        }}
      >
        <i className="fa-solid fa-phone social-icon phone-icon"></i>

        <span>
          Continue with Phone Number
        </span>
      </button>

      {/* FACEBOOK */}

      <button
        type="button"
        className="social-button facebook-button"
      >
        <i className="fa-brands fa-facebook-f social-icon facebook-icon"></i>

        <span>
          Continue with Facebook
        </span>
      </button>

    </div>
  );
}

export default SocialLogin;