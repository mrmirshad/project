import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  useEffect(() => {
    // Optional popup
    setTimeout(() => {
      const popup = document.getElementById("popup");
      if (popup) popup.style.opacity = "1";
    }, 500);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFE5D1, #FFD6C2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "white",
          padding: "40px 30px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          textAlign: "center",
          animation: "fadeIn 1s ease",
        }}
      >
        <CheckCircle size={80} color="#28a745" />

        <h1
          style={{
            marginTop: "20px",
            fontSize: "28px",
            color: "#333",
            fontWeight: 700,
          }}
        >
          Payment Successful 🎉
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "16px",
            color: "#555",
            lineHeight: "1.6",
          }}
        >
          Thank you for your kind donation.  
          May you receive blessings, peace, and happiness.  
          Your support helps us continue our service.
        </p>

        {/* Popup */}
        <div
          id="popup"
          style={{
            marginTop: "25px",
            background: "#FFF2E8",
            borderLeft: "6px solid #FF8A4C",
            padding: "15px",
            borderRadius: "10px",
            fontSize: "15px",
            color: "#663300",
            opacity: 0,
            transition: "opacity 1s",
          }}
        >
          ✔ Your transaction has been recorded  
          ✔ Confirmation email will be sent shortly  
          ✔ You can safely close this page
        </div>

        <a
          href="/"
          style={{
            marginTop: "30px",
            display: "inline-block",
            padding: "14px 28px",
            background: "linear-gradient(135deg, #FF9B5E, #FF7A3D)",
            color: "white",
            borderRadius: "50px",
            fontSize: "16px",
            textDecoration: "none",
            fontWeight: "600",
            boxShadow: "0 6px 15px rgba(255,140,80,0.4)",
            transition: "0.3s",
          }}
        >
          Return to Website
        </a>
      </div>

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
