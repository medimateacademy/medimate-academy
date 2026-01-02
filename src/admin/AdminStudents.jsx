import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const snap = await getDocs(collection(db, "Users"));
        const list = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setStudents(list);
      } catch (err) {
        console.error("Failed to fetch students", err);
        alert("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Update courses
  const saveCourses = async (id, coursesText) => {
    const coursesArray = coursesText
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    if (coursesArray.length === 0) {
      return alert("Courses cannot be empty");
    }

    try {
      setSavingId(id);
      await updateDoc(doc(db, "Users", id), {
        enrolledCourses: coursesArray,
      });
      alert("Courses updated");
    } catch (err) {
      console.error(err);
      alert("Update failed: " + err.message);
    } finally {
      setSavingId(null);
    }
  };

  // Delete Firestore student (Auth untouched)
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete student from Firestore?")) return;

    try {
      await deleteDoc(doc(db, "Users", id));
      setStudents((prev) => prev.filter((s) => s.id !== id));
      alert("Student removed from Firestore");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <p style={{ padding: 40 }}>Loading students...</p>;

  return (
    <div style={{ padding: 40, maxWidth: 900 }}>
      <h2 style={{ marginBottom: 20 }}>Students</h2>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        students.map((s) => (
          <div
            key={s.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 20,
              marginBottom: 15,
            }}
          >
            <p><strong>Email:</strong> {s.email}</p>
            <p style={{ fontSize: 12, color: "#777" }}>
              UID: {s.id}
            </p>

            <input
              defaultValue={(s.enrolledCourses || []).join(", ")}
              id={`courses-${s.id}`}
              placeholder="course1, course2"
              style={{
                width: "100%",
                padding: 8,
                marginBottom: 10,
              }}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() =>
                  saveCourses(
                    s.id,
                    document.getElementById(`courses-${s.id}`).value
                  )
                }
                disabled={savingId === s.id}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                {savingId === s.id ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => deleteStudent(s.id)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}