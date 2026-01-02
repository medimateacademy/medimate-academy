import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { courseMaterials } from "../data/courseMaterials";

function StudyMaterial() {
  const { courseId } = useParams(); // e.g., "cardio"
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const checkEnrollmentAndLoadModules = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate("/login");
          return;
        }

        // Check enrollment
        const userDocRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userDocRef);

        let isEnrolled = false;
        if (userSnap.exists()) {
          const data = userSnap.data();
          const courses = Array.isArray(data.enrolledCourses)
            ? data.enrolledCourses
            : typeof data.enrolledCourses === "string"
            ? [data.enrolledCourses]
            : [];
          isEnrolled = courses
            .map((c) => c.toLowerCase())
            .includes(courseId.toLowerCase());
        }
        setEnrolled(isEnrolled);

        // Load modules from Firestore
        const courseDocRef = doc(db, "courses", courseId.toLowerCase());
        const courseSnap = await getDoc(courseDocRef);

        if (courseSnap.exists()) {
          const courseData = courseSnap.data();
          if (Array.isArray(courseData.modules) && courseData.modules.length > 0) {
            setModules(courseData.modules);
          } else {
            setModules(courseMaterials[courseId.toLowerCase()] || []);
          }
        } else {
          setModules(courseMaterials[courseId.toLowerCase()] || []);
        }
      } catch (err) {
        console.error("Error loading course modules:", err);
        setModules(courseMaterials[courseId.toLowerCase()] || []);
      } finally {
        setLoading(false);
      }
    };

    checkEnrollmentAndLoadModules();
  }, [courseId, navigate]);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  if (!enrolled)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>You are not enrolled in this course.</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "50px 20px" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "20px" }}>
        {courseId.charAt(0).toUpperCase() + courseId.slice(1)} Course
      </h1>

      <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "15px" }}>Modules</h2>

      {modules.length === 0 ? (
        <p>No modules available for this course yet.</p>
      ) : (
        <ul style={{ fontSize: "16px", lineHeight: "1.8" }}>
          {modules.map((mod, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <span
                style={{
                  fontWeight: "500",
                  color: "#1a73e8",
                  textDecoration: mod.link ? "underline" : "none",
                  cursor: mod.link ? "pointer" : "default",
                }}
                onClick={() => {
                  if (mod.link) window.open(mod.link, "_blank");
                }}
              >
                {index + 1}. {mod.module || mod.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudyMaterial;