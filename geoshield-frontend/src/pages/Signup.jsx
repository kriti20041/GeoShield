import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await api.post("/api/auth/register", {
        email,
        password,
      });
      alert("Signup successful. Please login.");
      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🛡️ Create Account</h2>
        <p style={styles.subtitle}>
          Secure your access with GeoShield
        </p>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={signup}>
          Sign Up
        </button>

        <p style={styles.link} onClick={() => navigate("/")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "rgba(2, 6, 23, 0.95)",
    padding: "50px",
    borderRadius: "16px",
    width: "480px",
    maxWidth: "90%",
    boxShadow: "0 0 60px rgba(37,99,235,0.35)",
    border: "1px solid #1e293b",
  },
  title: {
    color: "#e5e7eb",
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "26px",
  },
  subtitle: {
    color: "#94a3b8",
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "30px",
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#020617",
    color: "#e5e7eb",
    fontSize: "15px",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#22c55e",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  link: {
    marginTop: "20px",
    textAlign: "center",
    color: "#60a5fa",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Signup;
