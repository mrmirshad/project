import { useEffect } from "react";
import { XCircle } from "lucide-react";

export default function PaymentFailed() {
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
          justifyContent: "center",
        }}
      >

        <h1
          style={{
            marginTop: "20px",
            fontSize: "28px",
            color: "#333",
            fontWeight: 700,
          }}
        >
          Payment Failed ❌
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "16px",
            color: "#555",
            lineHeight: "1.6",
          }}
        >
          Unfortunately, your payment could not be processed at the moment.  
          Please try again or contact support if the issue persists.  
          We appreciate your understanding.
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
          ✗ Transaction was not completed  
          ✗ No charges were made  
          ✗ Please check your payment details
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
          Try Again
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
