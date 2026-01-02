import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // <-- added for navigation

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [newCourseId, setNewCourseId] = useState("");
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const navigate = useNavigate(); // <-- initialize navigate

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "courses"));
      const list = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title || docSnap.id,
          modules: data.modules || [],
          visible: data.visible !== false,
        };
      });
      setCourses(list);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add new course
  const handleAddCourse = async () => {
    if (!newCourseId || !newCourseTitle) return alert("Fill both fields");
    try {
      await setDoc(doc(db, "courses", newCourseId.toLowerCase()), {
        title: newCourseTitle,
        modules: [],
        visible: true,
      });
      setNewCourseId("");
      setNewCourseTitle("");
      fetchCourses();
    } catch (err) {
      alert("Failed to add course: " + err.message);
    }
  };

  // Delete course
  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete this course permanently?")) return;
    try {
      await deleteDoc(doc(db, "courses", id));
      fetchCourses();
    } catch (err) {
      alert("Failed to delete course: " + err.message);
    }
  };

  // Update course title
  const handleUpdateCourseTitle = async (id, title) => {
    const newTitle = prompt("Enter new course title:", title);
    if (!newTitle) return;
    try {
      await updateDoc(doc(db, "courses", id), { title: newTitle });
      fetchCourses();
    } catch (err) {
      alert("Failed to update course: " + err.message);
    }
  };

  // Toggle visibility
  const toggleVisibility = async (id, current) => {
    try {
      await updateDoc(doc(db, "courses", id), { visible: !current });
      fetchCourses();
    } catch (err) {
      alert("Failed to update visibility: " + err.message);
    }
  };

  // Add module
  const handleAddModule = async (courseId) => {
    const name = prompt("Enter module name:");
    const link = prompt("Enter Google Drive link (optional):");
    if (!name) return;

    const course = courses.find((c) => c.id === courseId);
    const updatedModules = [...(course.modules || []), { module: name, link }];

    try {
      await updateDoc(doc(db, "courses", courseId), { modules: updatedModules });
      fetchCourses();
    } catch (err) {
      alert("Failed to add module: " + err.message);
    }
  };

  // Delete module
  const handleDeleteModule = async (courseId, index) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;
    const updatedModules = course.modules.filter((_, i) => i !== index);
    try {
      await updateDoc(doc(db, "courses", courseId), { modules: updatedModules });
      fetchCourses();
    } catch (err) {
      alert("Failed to delete module: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Courses</h2>

      {/* Add New Course */}
      <div
        style={{
          marginBottom: "20px",
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <h3>Add New Course</h3>
        <input
          placeholder="Course ID"
          value={newCourseId}
          onChange={(e) => setNewCourseId(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          placeholder="Course Title"
          value={newCourseTitle}
          onChange={(e) => setNewCourseTitle(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>

      {/* Course List */}
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>
              {course.title} (ID: {course.id}){" "}
              <button onClick={() => handleUpdateCourseTitle(course.id, course.title)}>
                Edit
              </button>{" "}
              <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>{" "}
              <button onClick={() => handleAddModule(course.id)}>Add Module</button>{" "}
              <button
                onClick={() => toggleVisibility(course.id, course.visible)}
                style={{
                  background: course.visible ? "#2ecc71" : "#999",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {course.visible ? "Visible" : "Hidden"}
              </button>{" "}
              {/* New button for admin to edit syllabus separately */}
              <button
                onClick={() => navigate(`/admin/course/${course.id}`)}
                style={{
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
              >
                Edit Syllabus
              </button>
            </h3>

            {course.modules.length === 0 ? (
              <p>No modules yet.</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #ccc" }}>
                    <th style={{ padding: "8px", textAlign: "left" }}>Course Name</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>Module Name</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>Google Drive Link</th>
                    <th style={{ padding: "8px", textAlign: "left" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {course.modules.map((mod, index) => (
                    <tr key={index}>
                      <td style={{ padding: "8px" }}>{course.title}</td>
                      <td style={{ padding: "8px" }}>{mod.module}</td>
                      <td style={{ padding: "8px" }}>
                        {mod.link ? (
                          <a href={mod.link} target="_blank" rel="noopener noreferrer">
                            {mod.link}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td style={{ padding: "8px" }}>
                        <button onClick={() => handleDeleteModule(course.id, index)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))
      )}
    </div>
  );
}