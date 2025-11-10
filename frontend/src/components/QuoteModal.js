import React, { useState } from "react";

function QuoteModal({ onClose }) {
  const [kw, setKw] = useState("");
  const [quote, setQuote] = useState(null);

  const handleCalculate = () => {
    const kwValue = parseFloat(kw);

    if (isNaN(kwValue) || kwValue <= 0) {
      setQuote("⚠️ Please enter a valid positive number for kW.");
      return;
    }

    let costPerKw;
    if (kwValue < 10) {
      costPerKw = 50000; // for 1–9 kW
    } else {
      costPerKw = 42000; // for 10 kW and above
    }

    const total = kwValue * costPerKw;

    setQuote({
      costPerKw,
      total,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>⚡ Get a Solar Quote</h2>
        <p>Enter Power Requirement (in kW):</p>

        <input
          type="number"
          placeholder="Enter kW (e.g., 5)"
          value={kw}
          onChange={(e) => setKw(e.target.value)}
          className="kw-input"
        />

        <div className="modal-buttons">
          <button onClick={handleCalculate} className="calc-btn">
            Calculate
          </button>
          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>

        {quote && typeof quote === "object" && (
          <div className="quote-box">
            <h3>💰 Estimated Cost: ₹{quote.total.toLocaleString("en-IN")}</h3>
            <p>
              Cost per kW: ₹{quote.costPerKw.toLocaleString("en-IN")}
            </p>
            <small>
              *Price may vary depending on location, installation type, and budget.*
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuoteModal;
