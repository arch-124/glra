import React, { useState } from "react";

export default function QuoteModal({ onClose }) {
  const [kw, setKw] = useState("");
  const [price, setPrice] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!kw || kw <= 0) {
      setPrice("⚠️ Please enter a valid power value (in kW).");
      return;
    }
    const total = kw * 42000;
    setPrice(`💰 Estimated Cost: ₹${total.toLocaleString("en-IN")}`);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.heading}>
          ⚡ Get a <span style={styles.highlight}>Solar Quote</span>
        </h2>

        <form onSubmit={handleCalculate} style={styles.form}>
          <label style={styles.label}>Enter Power Requirement (in kW):</label>
          <input
            type="number"
            placeholder="e.g. 5"
            min="1"
            step="0.1"
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.calculateBtn}>
            Calculate
          </button>
        </form>

        {price && (
          <div style={styles.resultBox}>
            <p style={styles.result}>{price}</p>
            <p style={styles.note}>
              *Price may vary depending on location, installation type, and budget.*
            </p>
          </div>
        )}

        <button onClick={onClose} style={styles.closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "1rem",
  },
  modal: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "2rem",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    textAlign: "center",
    animation: "fadeIn 0.3s ease",
  },
  heading: {
    fontSize: "1.6rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#111827",
  },
  highlight: {
    color: "#0B0C10",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    textAlign: "center",
  },
  calculateBtn: {
    backgroundColor: "#0B0C10", // matches your site's dark navy theme
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    marginTop: "8px",
  },
  resultBox: {
    marginTop: "1.5rem",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "1rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  result: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#111827",
  },
  note: {
    fontSize: "0.85rem",
    color: "#666",
    marginTop: "6px",
  },
  closeBtn: {
    marginTop: "1rem",
    backgroundColor: "#e5e7eb",
    border: "none",
    borderRadius: "10px",
    padding: "10px",
    fontWeight: "500",
    width: "100%",
    cursor: "pointer",
    color: "#111",
  },
};
