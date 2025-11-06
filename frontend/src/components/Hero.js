import React from "react";
import "../App.css";
import solarImage from "../solar.jpg";

function HeroSection() {
  // ✅ Smooth scroll handler
  const scrollToFooter = () => {
    const footer = document.getElementById("contact-section");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-left">
        <img src={solarImage} alt="Solar panel installation" />
      </div>

      <div className="hero-right">
        <h1>Harnessing Solar Power Today</h1>
        <div className="hero-card">
          <h3>Securing Your Green Future</h3>
          <p>
            We provide high-quality solar panel installations tailored to your
            needs with competitive pricing.
          </p>

          {/* ✅ Smooth scroll to footer */}
          <button className="contact-btn" onClick={scrollToFooter}>
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
