import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Dashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate("/login");
          return;
        }

        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Ensure we get array of strings
          const courses =
            Array.isArray(data.enrolledCourses) &&
            data.enrolledCourses.length > 0
              ? data.enrolledCourses.map((c) =>
                  Array.isArray(c) ? c[0] : c
                )
              : [];
          setEnrolledCourses(courses);
        } else {
          setEnrolledCourses([]);
        }
      } catch (err) {
        console.error(err);
        setEnrolledCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  if (enrolledCourses.length === 0)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        You have not enrolled in any courses yet.
      </p>
    );

  return (
    <div style={{ padding: "50px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "40px" }}>
        Student Dashboard
      </h1>

      {enrolledCourses.map((course) => (
        <div
          key={course}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <span style={{ fontSize: "18px", fontWeight: "600" }}>{course}</span>
          <button
            onClick={() => navigate(`/study/${course.toLowerCase()}`)} // FIXED: single string
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            View Course
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;