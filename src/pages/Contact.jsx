import React from "react";

export default function Contact() {
  return (
    <div style={{ padding: "50px 20px", maxWidth: "800px", margin: "auto" }}>
      <h1
        style={{
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        Contact Us
      </h1>

      {/* Courses Section */}
      <section
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "20px" }}>
          For Courses
        </h2>
        <p style={{ fontSize: "16px", lineHeight: "1.8" }}>
          <strong>Email:</strong>{" "}
          <a href="mailto:medimateacademy@gmail.com" style={{ color: "#0000EE" }}>
            medimateacademy@gmail.com
          </a>
        </p>
        <p style={{ fontSize: "16px", lineHeight: "1.8" }}>
          <strong>WhatsApp Number:</strong>{" "}
          <a
            href="https://wa.me/919187445882"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#25D366" }}
          >
            +91 9187445882
          </a>
        </p>
      </section>

      {/* Documentation Section */}
      <section
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "20px" }}>
          For Documentation and Licensing 
        </h2>
        <p style={{ fontSize: "16px", lineHeight: "1.8" }}>
          <strong>Email:</strong>{" "}
          <a href="mailto:medimateacademy@gmail.com" style={{ color: "#0000EE" }}>
            medimateacademy@gmail.com
          </a>
        </p>
        <p style={{ fontSize: "16px", lineHeight: "1.8" }}>
          <strong>WhatsApp Number:</strong>{" "}
          <a
            href="https://wa.me/919187445882"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#25D366" }}
          >
            +91 9187445882
          </a>
        </p>
      </section>
    </div>
  );
}