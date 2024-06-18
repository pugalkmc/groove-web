import React, { useState } from "react";
import "./SubscribeSection.css";
import axiosInstance from "../../config";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    await axiosInstance.post("/api/subscribe", {
        email
    })
    setEmail("");
  };

  return (
    <div className="subscribe-section">
      <h2>Subscribe to our Newsletter</h2>
      <p>Stay updated with the latest news and offers from Groove AI</p>
      <form className="subscribe-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-dark">Subscribe</button>
      </form>
    </div>
  );
};

export default SubscribeSection;