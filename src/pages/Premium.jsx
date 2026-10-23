import { useState } from "react";
import { Link } from "react-router-dom";

function Premium() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // =========================================
  // SELECT PLAN
  // =========================================

  function handlePlan(plan) {
    setSelectedPlan(plan);
    setPaymentMethod("");
    setPaymentSuccess(false);
    setPaymentLoading(false);
  }

  // =========================================
  // PAYMENT
  // =========================================

  async function handlePayment() {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (!selectedPlan) {
      alert("Please select a premium plan.");
      return;
    }

    try {
      setPaymentLoading(true);

      // =========================================
      // CREATE ORDER
      // =========================================

      const response = await fetch(
        "http://localhost:5000/api/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan: selectedPlan,
            
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Unable to create payment order."
        );
      }

      // =========================================
      // CHECK RAZORPAY
      // =========================================

      if (!window.Razorpay) {
        alert(
          "Razorpay Checkout is not loaded. Please refresh the page."
        );

        setPaymentLoading(false);
        return;
      }

      // =========================================
      // RAZORPAY OPTIONS
      // =========================================

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: data.order.currency,

        name: "Movie Explorer",

        description: selectedPlan,

        order_id: data.order.id,

        handler: async function (paymentResponse) {
          try {
            console.log(
              "Razorpay Payment Response:",
              paymentResponse
            );

            // =========================================
            // VERIFY PAYMENT WITH BACKEND
            // =========================================

            const verifyResponse = await fetch(
              "http://localhost:5000/api/verify-payment",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify(
                  paymentResponse
                ),
              }
            );

            const result =
              await verifyResponse.json();

            if (
              !verifyResponse.ok ||
              !result.success
            ) {
              throw new Error(
                result.message ||
                  "Payment verification failed."
              );
            }

            // =========================================
            // VERIFIED SUCCESS
            // =========================================

            console.log(
              "Payment Verified:",
              result
            );

            // Save premium subscription
            localStorage.setItem(
              "premiumSubscription",
              JSON.stringify({
                plan: selectedPlan,
                amount: getPrice(),
                paymentId:
                  paymentResponse.razorpay_payment_id,
                active: true,
                activatedAt: new Date().toISOString(),
              })
            );

            setPaymentSuccess(true);
            setPaymentLoading(false);

          } catch (error) {
            console.error(
              "Payment Verification Error:",
              error
            );

            setPaymentLoading(false);

            alert(
              "Payment verification failed. If money was deducted, please contact support."
            );
          }
        },

        // =========================================
        // PREFILL
        // =========================================

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        // =========================================
        // THEME
        // =========================================

        theme: {
          color: "#e50914",
        },

        // =========================================
        // MODAL
        // =========================================

        modal: {
          ondismiss: function () {
            console.log(
              "Razorpay payment window closed."
            );

            setPaymentLoading(false);
          },
        },
      };

      // =========================================
      // CREATE RAZORPAY INSTANCE
      // =========================================

      const razorpay =
        new window.Razorpay(options);

      // =========================================
      // PAYMENT FAILED
      // =========================================

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment Failed:",
            response.error
          );

          setPaymentLoading(false);

          alert(
            response.error?.description ||
              "Payment failed. Please try again."
          );
        }
      );

      // =========================================
      // OPEN RAZORPAY
      // =========================================

      razorpay.open();

    } catch (error) {
      console.error(
        "Payment Error:",
        error
      );

      setPaymentLoading(false);

      alert(
        error.message ||
          "Unable to start payment."
      );
    }
  }

  // =========================================
  // PLAN PRICE
  // =========================================

  function getPrice() {
    if (selectedPlan === "Premium Monthly") {
      return "₹149";
    }

    if (selectedPlan === "Premium Yearly") {
      return "₹999";
    }

    return "₹0";
  }

  // =========================================
  // UI
  // =========================================

  return (
    <main className="premium-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="premium-header">

        <div className="premium-icon">
          👑
        </div>

        <h1>
          Movie Explorer Premium
        </h1>

        <p>
          Unlock a better movie experience.
        </p>

      </div>


      {/* =========================================
          PREMIUM PLANS
      ========================================= */}

      <div className="premium-plans">

        {/* =========================================
            FREE PLAN
        ========================================= */}

        <div className="premium-card">

          <h2>
            Free
          </h2>

          <div className="price">
            ₹0
            <span>/month</span>
          </div>

          <ul>
            <li>✅ Browse Movies</li>
            <li>✅ Search Movies</li>
            <li>✅ Add Favorites</li>
            <li>❌ Premium Content</li>
            <li>❌ Ad-Free Experience</li>
          </ul>

          <button
            type="button"
            className="plan-button"
            onClick={() =>
              handlePlan("Free")
            }
          >
            Continue Free
          </button>

        </div>


        {/* =========================================
            MONTHLY PLAN
        ========================================= */}

        <div className="premium-card featured">

          <div className="popular-badge">
            MOST POPULAR
          </div>

          <h2>
            Premium Monthly
          </h2>

          <div className="price">
            ₹149
            <span>/month</span>
          </div>

          <ul>
            <li>✅ Everything in Free</li>
            <li>✅ Premium Movies</li>
            <li>✅ Ad-Free Experience</li>
            <li>✅ HD Streaming</li>
            <li>✅ Exclusive Content</li>
          </ul>


          {/* DEVICE INFORMATION */}

          <div className="device-info">

            <h3>
              📱 Device Access
            </h3>

            <p>
              Watch on{" "}
              <strong>
                any 2 devices at a time
              </strong>.
            </p>

            <div className="device-list">

              <span>📱 Mobile</span>

              <span>📲 Tablet</span>

              <span>💻 Laptop</span>

              <span>📺 TV</span>

            </div>

            <small>
              You can use Mobile, Tablet, Laptop
              or TV, but only 2 devices can be
              active at the same time.
            </small>

          </div>


          <button
            type="button"
            className="plan-button premium-button"
            onClick={() =>
              handlePlan(
                "Premium Monthly"
              )
            }
          >
            Choose Premium
          </button>

        </div>


        {/* =========================================
            YEARLY PLAN
        ========================================= */}

        <div className="premium-card">

          <h2>
            Premium Yearly
          </h2>

          <div className="price">
            ₹999
            <span>/year</span>
          </div>

          <ul>
            <li>✅ Everything in Premium</li>
            <li>✅ Save Money</li>
            <li>✅ Premium Movies</li>
            <li>✅ Ad-Free Experience</li>
            <li>✅ Exclusive Content</li>
          </ul>


          {/* DEVICE INFORMATION */}

          <div className="device-info">

            <h3>
              📺 Device Access
            </h3>

            <p>
              Watch on{" "}
              <strong>
                up to 4 devices at a time
              </strong>.
            </p>

            <div className="device-list">

              <span>📱 Mobile</span>

              <span>📲 Tablet</span>

              <span>💻 Laptop</span>

              <span>📺 TV</span>

            </div>

            <small>
              Use Mobile, Tablet, Laptop and TV.
              Up to 4 devices can be active at
              the same time.
            </small>

          </div>


          <button
            type="button"
            className="plan-button"
            onClick={() =>
              handlePlan(
                "Premium Yearly"
              )
            }
          >
            Choose Yearly
          </button>

        </div>

      </div>


      {/* =========================================
          PAYMENT SECTION
      ========================================= */}

      {selectedPlan &&
        selectedPlan !== "Free" &&
        !paymentSuccess && (

          <div className="selected-plan">

            <h2>
              💳 Payment
            </h2>

            <p>
              Selected Plan:{" "}
              <strong>
                {selectedPlan}
              </strong>
            </p>

            <p>
              Amount:{" "}
              <strong>
                {getPrice()}
              </strong>
            </p>


            {/* =====================================
                PAYMENT METHODS
            ===================================== */}

            <div className="payment-methods">

              {/* UPI */}

              <label>

                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={
                    paymentMethod === "upi"
                  }
                  onClick={() => {
                    setPaymentMethod(
                      paymentMethod === "upi"
                        ? ""
                        : "upi"
                    );
                  }}
                  onChange={() => {}}
                />

                UPI

              </label>


              {/* CARD */}

              <label>

                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={
                    paymentMethod === "card"
                  }
                  onClick={() => {
                    setPaymentMethod(
                      paymentMethod === "card"
                        ? ""
                        : "card"
                    );
                  }}
                  onChange={() => {}}
                />

                Card

              </label>


              {/* NET BANKING */}

              <label>

                <input
                  type="radio"
                  name="payment"
                  value="netbanking"
                  checked={
                    paymentMethod ===
                    "netbanking"
                  }
                  onClick={() => {
                    setPaymentMethod(
                      paymentMethod ===
                        "netbanking"
                        ? ""
                        : "netbanking"
                    );
                  }}
                  onChange={() => {}}
                />

                Net Banking

              </label>

            </div>


            {/* =====================================
                PAY BUTTON
            ===================================== */}

            <button
              type="button"
              className="payment-button"
              onClick={handlePayment}
              disabled={paymentLoading}
            >
              {paymentLoading
                ? "Processing..."
                : `Pay ${getPrice()}`}
            </button>

          </div>

        )}


      {/* =========================================
          FREE PLAN MESSAGE
      ========================================= */}

      {selectedPlan === "Free" && (

        <div className="selected-plan">

          <h2>
            🎉 Free Plan Selected
          </h2>

          <p>
            You can continue using Movie
            Explorer for free.
          </p>

        </div>

      )}


      {/* =========================================
          PAYMENT SUCCESS
      ========================================= */}

      {paymentSuccess && (

        <div className="selected-plan">

          <h2>
            🎉 Payment Successful!
          </h2>

          <p>
            Your{" "}
            <strong>
              {selectedPlan}
            </strong>{" "}
            plan is now active.
          </p>

          <p>
            Amount Paid:{" "}
            <strong>
              {getPrice()}
            </strong>
          </p>

          <Link
            to="/"
            className="payment-button"
          >
            Start Watching 🎬
          </Link>

        </div>

      )}


      {/* =========================================
          BACK
      ========================================= */}

      <Link
        to="/"
        className="auth-back"
      >
        ← Back to Movies
      </Link>

    </main>
  );
}

export default Premium;