import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // لو اصلا مسجل دخول قبل كده يحوله للدashboard
    const isAuthenticated = localStorage.getItem("auth");
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔑 Login Page</h2>
      <button
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
