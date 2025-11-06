import React from "react";
import "../App.css";
import worker1 from "../worker1.jpg";
import worker2 from "../worker2.jpeg";

function Commitment() {
  return (
    <section className="commitment">
      <div className="text">
        <h2>Our Commitment to Quality</h2>
        <p>
          GLRA is dedicated to delivering exceptional solar panel repair and installation
          services. Founded in 2021, we combine competitive pricing with
          high-quality products that meet diverse client budgets and ensure
          efficient solar power solutions.
        </p>
      </div>
      <div className="images">
        <img src={worker1} alt="Solar Worker 1" />
        <img src={worker2} alt="Solar Worker 2" />
      </div>
    </section>
  );
}

export default Commitment;
