import { useState } from "react";

export default function About() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "50px 20px" }}>
      {/* Academy Overview */}
      <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "30px", textAlign: "center" }}>
        About MediMate Academy
      </h1>
      <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "40px" }}>
        Welcome to MediMate Academy, your gateway to pursuing a successful career abroad. 
        By enrolling in our carefully designed courses, you can prepare effectively for exams 
        and achieve your professional goals. Our expert faculty and comprehensive study materials 
        ensure you are ready to succeed in your chosen field.
      </p>

      {/* Legal Sections */}
      {[
        {
          key: "terms",
          title: "Terms & Conditions",
          content: (
            <div>
              <h3>Introduction</h3>
              <p>Welcome to MediMate Academy. By enrolling in any course or using our services, you agree to comply with these Terms and Conditions. If you do not agree, you must not use our services.</p>

              <h3>Eligibility</h3>
              <p>Our courses are intended for individuals residing in India who are legally capable of entering into contracts.</p>

              <h3>Course Content</h3>
              <p>All course material, including videos, PDFs, and other resources, is the intellectual property of MediMate Academy. Students may use the content for personal learning only. Redistribution, resale, or commercial use is strictly prohibited.</p>

              <h3>Enrollment and Payment</h3>
              <p>Payment for courses must be made in INR through the approved payment method. Enrollment is confirmed only after full payment is received.</p>

              <h3>Student Conduct</h3>
              <p>Students must provide accurate information during registration. Harassment, copyright violation, or misuse of course materials is prohibited.</p>

              <h3>Limitation of Liability</h3>
              <p>MediMate Academy is not responsible for any indirect, incidental, or consequential loss arising from participation in courses. MediMate Academy does not guarantee any specific exam results or career outcomes.</p>

              <h3>Modifications</h3>
              <p>MediMate Academy reserves the right to modify course content, fees, or policies at any time, with or without notice.</p>

              <h3>Governing Law and Jurisdiction</h3>
              <p>These Terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of courts in Kerala.</p>

              <h3>Contact</h3>
              <p>For queries, contact: medimateacademy@gmail.com</p>
            </div>
          ),
        },
        {
          key: "refund",
          title: "Refund & Return Policy",
          content: (
            <div>
              <h3>General Policy</h3>
              <p>All course fees are non-refundable once access to course content has been provided, in compliance with the Consumer Protection Act.</p>

              <h3>Refund Exceptions</h3>
              <p>Refunds may be considered only in cases of technical failure or administrative errors, where MediMate Academy is at fault. Requests must be submitted in writing to medimateacademy@gmail.com within 7 days of payment.</p>

              <h3>Refund Procedure</h3>
              <p>Eligible refund requests will be processed within 14 working days. Refunds will be made to the original mode of payment.</p>

              <h3>No Partial Refunds</h3>
              <p>MediMate Academy does not provide partial refunds for unused portions of a course or missed sessions.</p>

              <h3>Right to Deny Refund</h3>
              <p>MediMate Academy reserves the right to deny refund requests that are frivolous, fraudulent, or not in compliance with these policies.</p>
            </div>
          ),
        },
        {
          key: "privacy",
          title: "Privacy Policy",
          content: (
            <div>
              <h3>Information Collection</h3>
              <p>We collect personal information such as name, email, phone number, and payment details to provide course services. We do not collect sensitive information without explicit consent.</p>

              <h3>Use of Information</h3>
              <p>Personal information is used solely for course enrollment, delivery, communication, and payment processing. We may use anonymized data for improving services or internal analytics.</p>

              <h3>Information Sharing</h3>
              <p>MediMate Academy does not share personal information with third parties except: payment processors for transaction completion, legal authorities as required by law, and third-party service providers under strict confidentiality agreements.</p>

              <h3>Data Security</h3>
              <p>We implement reasonable administrative, technical, and physical security measures to protect personal information from unauthorized access, disclosure, or misuse.</p>

              <h3>Retention of Data</h3>
              <p>Personal data will be retained only for as long as necessary for the purposes outlined in this policy or as required by law.</p>

              <h3>Cookies and Tracking</h3>
              <p>If using an online platform, minimal cookies may be used for user experience. Users may opt out through browser settings.</p>

              <h3>Your Rights</h3>
              <p>You have the right to access, correct, or request deletion of your personal data by contacting medimateacademy@gmail.com.</p>

              <h3>Changes to Privacy Policy</h3>
              <p>MediMate Academy reserves the right to update this policy at any time. Updated policies will be posted on our platform and become effective immediately.</p>
            </div>
          ),
        },
      ].map((section) => (
        <div
          key={section.key}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "15px",
            overflow: "hidden",
            transition: "all 0.3s",
          }}
        >
          <div
            onClick={() => toggleSection(section.key)}
            style={{
              padding: "15px 20px",
              background: "#f5f5f5",
              fontWeight: "600",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            {section.title}
          </div>
          {openSection === section.key && (
            <div style={{ padding: "15px 20px", fontSize: "16px", lineHeight: "1.6" }}>
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}