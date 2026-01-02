import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, "courses");
        const courseSnapshot = await getDocs(coursesCollection);

        const courseList = courseSnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          // Hide courses marked invisible
          .filter(course => course.visible !== false);

        setCourses(courseList);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "50px 20px" }}>
      <h1
        style={{
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "30px",
          textAlign: "center"
        }}
      >
        Our Courses
      </h1>

      {courses.length === 0 ? (
        <p style={{ textAlign: "center" }}>No courses available yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px"
          }}
        >
          {courses.map(course => (
            <div
              key={course.id}
              style={{
                border: "1px solid #ddd",
                padding: "25px 20px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                textAlign: "center",
                transition: "transform 0.2s",
                cursor: "pointer"
              }}
              onClick={() => navigate(`/courses/${course.id}`)}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  marginBottom: "15px"
                }}
              >
                {course.title || course.id}
              </h2>

              <p
                style={{
                  fontSize: "16px",
                  marginBottom: "20px",
                  color: "#555"
                }}
              >
                {course.description || "Click to view course details"}
              </p>

              <button
                style={{
                  padding: "10px 25px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onClick={() => navigate(`/courses/${course.id}`)}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#218838")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#28a745")}
              >
                View Course
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;