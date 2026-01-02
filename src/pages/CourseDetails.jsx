import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "../styles/course-details.css";

function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [courseName, setCourseName] = useState("");
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        // Fetch course title from courses collection
        const courseRef = doc(db, "courses", courseId.toLowerCase());
        const courseSnap = await getDoc(courseRef);
        setCourseName(courseSnap.exists() ? courseSnap.data().title : courseId);

        // Fetch syllabus
        const syllabusRef = doc(db, "Syllabus", courseId.toLowerCase());
        const syllabusSnap = await getDoc(syllabusRef);

        if (syllabusSnap.exists()) {
          const data = syllabusSnap.data();
          // Expect array of objects with 'module' key
          const moduleList = Array.isArray(data.modules)
            ? data.modules.map((m) => m.module || "Unnamed Module")
            : [];
          setModules(moduleList);
        } else {
          setModules([]);
        }
      } catch (err) {
        console.error("Error fetching syllabus:", err);
        setModules([]);
        setCourseName(courseId);
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabus();
  }, [courseId]);

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div className="course-details-page" style={{ maxWidth: "900px", margin: "auto", padding: "50px 20px" }}>
      <h1 className="course-details-title" style={{ fontSize: "36px", fontWeight: "700", marginBottom: "30px" }}>
        {courseName}
      </h1>

      <section className="course-overview" style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "15px" }}>Course Overview</h2>
        <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
          Learn {courseName} with expert guidance and study materials. This course provides comprehensive coverage of all necessary skills and knowledge.
        </p>
      </section>

      <section className="course-modules" style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "20px" }}>Syllabus / Modules</h2>
        {modules.length > 0 ? (
          <ul style={{ listStyle: "disc", paddingLeft: "20px", fontSize: "16px", lineHeight: "1.8" }}>
            {modules.map((mod, index) => (
              <li key={index}>{mod}</li>
            ))}
          </ul>
        ) : (
          <p>Modules will show after enrolling the course.</p>
        )}
      </section>

      <div className="course-cta" style={{ textAlign: "center" }}>
        <button
          className="enroll-btn"
          style={{ padding: "14px 32px", fontSize: "16px", fontWeight: "600", borderRadius: "8px", cursor: "pointer" }}
          onClick={() => navigate("/contact")}
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}

export default CourseDetails;