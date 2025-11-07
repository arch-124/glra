import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch Leads
  const fetchLeads = async () => {
    try {
      const response = await axios.get("https://glra-newback.onrender.com/api/leads/all");
      setLeads(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError("Failed to load leads. Please try again later.");
    }
  };

  // Fetch Bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get("https://glra-newback.onrender.com/api/bookings/all");
      setBookings(response.data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchBookings();

    const interval = setInterval(() => {
      fetchLeads();
      fetchBookings();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Logout with confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      navigate("/admin-login");
    }
  };

  return (
    <div className="dashboard-container">
   {/* ---- Header Section (centered title + aligned Logout) ---- */}
<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginBottom: "2rem",
    position: "relative",
  }}
>
  <h2
    className="dashboard-title"
    style={{
      color: "#0b0c10",
      fontWeight: 700,
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      margin: 0,
    }}
  >
    <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>📋</span>
    Admin Dashboard
  </h2>

  {/* Logout sits immediately to the right; small translateY aligns it visually */}
  <button
    onClick={handleLogout}
    className="logout-btn"
    style={{
      transform: "translateY(-2px)",   /* tweak this value if needed: -1px..-4px */
      marginLeft: "8px",
    }}
  >
    Logout
  </button>
</div>


      {/* ---- LEADS SECTION ---- */}
      <h3 className="section-title">Leads</h3>
      {error && <p className="error">{error}</p>}

      {leads.length > 0 ? (
        <div className="table-container">
          <table className="lead-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>
                    {new Date(lead.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error && <p className="no-leads">No leads found yet.</p>
      )}

      {/* ---- BOOKINGS SECTION ---- */}
      <h3 className="section-title">Bookings</h3>
      {bookings.length > 0 ? (
        <div className="table-container">
          <table className="lead-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.service}</td>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-leads">No bookings found yet.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
