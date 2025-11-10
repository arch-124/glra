import React, { useState } from "react";
import QuoteModal from "../components/QuoteModal";
import { Link } from "react-router-dom";

function Navbar() {
  const [showQuote, setShowQuote] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">GLRA</div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/admin" className="nav-link">Admin</Link>
        </li>
      </ul>

      <button className="quote-btn" onClick={() => setShowQuote(true)}>
        Get a Quote
      </button>

      {showQuote && <QuoteModal onClose={() => setShowQuote(false)} />}
    </nav>
  );
}

export default Navbar;
