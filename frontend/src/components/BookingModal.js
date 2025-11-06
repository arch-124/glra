import { useState } from "react";

export default function BookingModal({ service, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/bookings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, service })
    });
    const result = await res.json();
    setMessage(result.message);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{service}</h2>

        {message ? (
          <p style={styles.success}>{message}</p>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Name</label>
              <input
                name="name"
                onChange={handleChange}
                value={formData.name}
                style={styles.input}
                placeholder="Enter your name"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                style={styles.input}
                placeholder="you@example.com"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone</label>
              <input
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                style={styles.input}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div style={styles.row}>
              <div style={styles.halfInput}>
                <label style={styles.label}>Date</label>
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  value={formData.date}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.halfInput}>
                <label style={styles.label}>Time</label>
                <input
                  type="time"
                  name="time"
                  onChange={handleChange}
                  value={formData.time}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <button type="submit" style={styles.submitBtn}>
              Confirm Booking
            </button>
          </form>
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
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "1rem",
  },
  modal: {
    background: "#fff",
    borderRadius: "16px",
    padding: "2rem",
    width: "100%",
    maxWidth: "450px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    animation: "fadeIn 0.3s ease",
  },
  title: {
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "1.2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "0.9rem",
    color: "#333",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  halfInput: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  submitBtn: {
    marginTop: "1rem",
    backgroundColor: "#0B0C10",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
  closeBtn: {
    marginTop: "1rem",
    width: "100%",
    backgroundColor: "#e5e7eb",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    fontWeight: "500",
    cursor: "pointer",
  },
  success: {
    textAlign: "center",
    color: "green",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
};
