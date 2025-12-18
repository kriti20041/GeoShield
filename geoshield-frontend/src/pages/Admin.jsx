import { useEffect, useState } from "react";
import api from "../api/api";

function Admin() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api
      .get("/api/risk/admin/all")
      .then((res) => setLogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={styles.page}>
      <h1>🛡️ GeoShield Admin Dashboard</h1>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Region</th>
            <th>Risk Score</th>
            <th>Threats</th>
            <th>Checked At</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.region}</td>
              <td>{log.riskScore}</td>
              <td>{log.threats.join(", ")}</td>
              <td>{new Date(log.checkedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#020617",
    color: "#e5e7eb",
    padding: "40px",
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  },
};

export default Admin;
