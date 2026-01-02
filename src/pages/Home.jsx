import "../styles/home.css";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>MediMate Academy</h1>
          <p>Your passport for an abroad career</p>
          <div className="hero-buttons">
            <button
              className="primary"
              onClick={() => (window.location.href = "/contact")}
            >
              Join Now
            </button>
            <button
              className="secondary"
              onClick={() => (window.location.href = "/courses")}
            >
              View Courses
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why">
        <h2>Why Choose Us</h2>
        <div className="why-grid">
          <div className="why-card">Exam Oriented Classes</div>
          <div className="why-card">Experienced Faculties</div>
          <div className="why-card">Video + PDF + Mock Tests</div>
          <div className="why-card">WhatsApp Support</div>
        </div>
      </section>

      {/* COURSE HIGHLIGHTS */}
      <section className="highlights">
        <h2>Course Highlights</h2>
        <div className="highlight-grid">
          <div className="highlight-card">Live Classes</div>
          <div className="highlight-card">Pre-Recorded Classes</div>
          <div className="highlight-card">Mock Exams</div>
          <div className="highlight-card">Documentation Support</div>
          <div className="highlight-card">Job Vacancy Updates</div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Start Your Abroad Career Today</h2>
        <button onClick={() => (window.location.href = "/contact")}>
          Enroll Now
        </button>
      </section>
    </>
  );
}