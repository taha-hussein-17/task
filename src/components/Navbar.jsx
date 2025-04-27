import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("auth");

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#282c34",
      color: "white"
    }}>
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
        📁 File Manager
      </div>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 12px",
                backgroundColor: "tomato",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Login</Link>
        )}
      </div>
    </nav>
  );
}
