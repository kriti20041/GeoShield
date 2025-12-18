import { useState, useEffect } from "react";
import api from "../api/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function Dashboard() {
  const [lat, setLat] = useState(12.97);
  const [lng, setLng] = useState(77.59);
  const [placeType, setPlaceType] = useState("CAFE");
  const [riskData, setRiskData] = useState(null);

  // 📍 Auto-detect location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(+pos.coords.latitude.toFixed(4));
          setLng(+pos.coords.longitude.toFixed(4));
        },
        () => console.log("Location denied")
      );
    }
  }, []);

  const checkRisk = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        `/api/risk/check?latitude=${lat}&longitude=${lng}&placeType=${placeType}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRiskData(res.data);
    } catch {
      alert("Risk check failed");
    }
  };

  const riskColor =
    riskData?.riskScore >= 7
      ? "#dc2626"
      : riskData?.riskScore >= 4
      ? "#f59e0b"
      : "#16a34a";

  return (
    <div style={styles.page}>
      <h1>🛡️ GeoShield Dashboard</h1>
      <p style={styles.subtitle}>
        Real-time cyber risk intelligence based on your location
      </p>

      <div style={styles.layout}>
        {/* LEFT PANEL */}
        <div style={styles.card}>
          <input
            style={styles.input}
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Latitude"
          />
          <input
            style={styles.input}
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="Longitude"
          />

          <select
            style={styles.input}
            value={placeType}
            onChange={(e) => setPlaceType(e.target.value)}
          >
            <option value="CAFE">Cafe</option>
            <option value="MALL">Mall</option>
            <option value="AIRPORT">Airport</option>
            <option value="PUBLIC_WIFI">Public Wi-Fi</option>
          </select>

          <button style={styles.button} onClick={checkRisk}>
            Analyze Location Risk
          </button>

          {riskData && (
            <div style={styles.result}>
              <div style={{ ...styles.alert, borderColor: riskColor }}>
                {placeType === "PUBLIC_WIFI"
                  ? "⚠️ Public Wi-Fi detected — phishing risk increased"
                  : "🟢 Environment scanned successfully"}
              </div>

              <div style={styles.meter}>
                <div
                  style={{
                    ...styles.meterFill,
                    width: `${riskData.riskScore * 10}%`,
                    background: riskColor,
                  }}
                />
              </div>

              <h3>
                Risk Score:{" "}
                <span style={{ color: riskColor }}>
                  {riskData.riskScore.toFixed(1)} / 10
                </span>
              </h3>

              <div style={styles.badges}>
                {riskData.threats.map((t, i) => (
                  <span key={i} style={styles.badge}>
                    {t}
                  </span>
                ))}
              </div>

              <p style={styles.advice}>🔐 {riskData.advice}</p>
            </div>
          )}
        </div>

        {/* RIGHT PANEL – MAP */}
        <div style={styles.mapBox}>
          <MapContainer
            center={[lat, lng]}
            zoom={13}
            style={{ height: "100%", width: "100%", borderRadius: "16px" }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[lat, lng]}>
              <Popup>
                Your current location<br />
                Lat: {lat}, Lng: {lng}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #020617, #000)",
    color: "#e5e7eb",
    padding: "30px",
  },
  subtitle: { color: "#94a3b8", marginBottom: "20px" },
  layout: {
    display: "grid",
    gridTemplateColumns: "420px 1fr",
    gap: "30px",
    alignItems: "stretch",
  },
  card: {
    background: "rgba(2,6,23,0.75)",
    backdropFilter: "blur(14px)",
    borderRadius: "16px",
    padding: "25px",
    border: "1px solid #1e293b",
  },
  mapBox: {
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #1e293b",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    background: "#020617",
    border: "1px solid #334155",
    color: "#e5e7eb",
    borderRadius: "8px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg,#2563eb,#3b82f6)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
  result: { marginTop: "15px" },
  alert: {
    padding: "10px",
    borderLeft: "4px solid",
    marginBottom: "10px",
  },
  meter: {
    height: "8px",
    background: "#020617",
    borderRadius: "6px",
    overflow: "hidden",
  },
  meterFill: { height: "100%" },
  badges: { display: "flex", gap: "8px", marginTop: "8px" },
  badge: {
    background: "#7c2d12",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
  },
  advice: { marginTop: "10px", color: "#93c5fd" },
};

export default Dashboard;
