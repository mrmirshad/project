import { useEffect } from "react";

export default function PaymentSuccess() {
  useEffect(() => {
    // Popup message
    alert("🎉 Payment Successful! \nThank you for your donation.");
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Payment Successful</h1>
      <p>Your donation has been received successfully.</p>

      <a
        href="/"
        style={{
          padding: "12px 20px",
          background: "#28a745",
          color: "white",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Return to Home
      </a>
    </div>
  );
}
