import React, { useState } from "react";
import "../App.css";
import designImg from "../design.jpg";
import assessmentImg from "../assessment.jpg";
import installationImg from "../installation.jpg";
import BookingModal from "../components/BookingModal"; // <-- Import the modal

function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: "Custom Solar Design Consultation",
      image: designImg,
    },
    {
      title: "Site Assessment",
      image: assessmentImg,
    },
    {
      title: "Solar Panel Installation",
      image: installationImg,
    },
  ];

  return (
    <section className="services-section">
      <h2 className="services-title">Our Services</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img
              src={service.image}
              alt={service.title}
              className="service-img"
            />
            <h3>{service.title}</h3>

            <button
              className="book-btn"
              onClick={() => setSelectedService(service.title)} // open modal
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Render modal if service is selected */}
      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setSelectedService(null)} // close modal
        />
      )}
    </section>
  );
}

export default Services;
