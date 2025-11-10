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

    let costPerKw = kwValue >= 10 ? 42000 : 50000;
    const total = kwValue * costPerKw;
    setQuote(`💰 Estimated Cost: ₹${total.toLocaleString("en-IN")}`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>🔆 Get a Solar Quote</h2>
        <p>Enter your desired system size (in kW):</p>

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

        {quote && <p className="quote-result">{quote}</p>}
      </div>
    </div>
  );
}

export default QuoteModal;
