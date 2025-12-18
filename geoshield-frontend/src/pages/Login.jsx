import { useEffect, useRef, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Login
  const handleLogin = async () => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  // 🎯 PARTICLE EFFECT
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const symbols = ["🔒", "🛡️", "🌐", "🔑", "⚠️"];
    const particles = [];
    const mouse = { x: null, y: null };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 24;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
      }

      draw() {
        ctx.font = `${this.size}px Arial`;
        ctx.fillText(this.symbol, this.x, this.y);
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          this.x -= dx / 10;
          this.y -= dy / 10;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
    }

    for (let i = 0; i < 40; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <div style={styles.page}>
      {/* 🎥 Background Animation */}
      <canvas ref={canvasRef} style={styles.canvas} />

      {/* 🧊 Login Card */}
      <div style={styles.card}>
        <h1 style={styles.title}>🛡️ GeoShield</h1>
        <p style={styles.subtitle}>Secure access against risky networks</p>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Secure Login
        </button>

        {/* ✅ SIGNUP LINK */}
        <p style={styles.signupText}>
          Don’t have an account?{" "}
          <span
            style={styles.signupLink}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "#020617",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  card: {
    zIndex: 2,
    width: "380px",
    padding: "40px",
    background: "rgba(2,6,23,0.8)",
    borderRadius: "18px",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    color: "#e5e7eb",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#94a3b8",
    marginBottom: "25px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    background: "#020617",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "#e5e7eb",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "5px",
  },
  signupText: {
    marginTop: "18px",
    color: "#94a3b8",
    fontSize: "14px",
  },
  signupLink: {
    color: "#60a5fa",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Login;
