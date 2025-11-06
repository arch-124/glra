import React from "react";

const Footer = () => {
  return (
    <footer id="contact-section" style={styles.footer}>
      <h3 style={styles.title}>Contact Us</h3>
      <p>📞 +91 98765 43210</p>
      <p>✉️ support@glra.com</p>
      <p>🏢 GLRA Solar Pvt. Ltd, Hyderabad, India</p>
      <p style={styles.note}>
        We’re available 9AM – 6PM (Mon–Sat). Reach out for quotes, service help, or collaborations.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#111827",
    color: "white",
    textAlign: "center",
    padding: "2rem 1rem",
    marginTop: "3rem",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "0.8rem",
  },
  note: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#bbb",
  },
};

export default Footer;
