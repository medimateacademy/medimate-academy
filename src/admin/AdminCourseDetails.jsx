import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminCourseDetails({ courseId }) {
  const [courseTitle, setCourseTitle] = useState("");
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newModuleName, setNewModuleName] = useState("");

  // Fetch course data from Firebase (read-only)
  const fetchCourse = async () => {
    try {
      const courseRef = doc(db, "courses", courseId.toLowerCase());
      const snap = await getDoc(courseRef);

      if (snap.exists()) {
        const data = snap.data();
        setCourseTitle(data.title || courseId);
        setModules(Array.isArray(data.modules) ? data.modules : []);
      } else {
        setCourseTitle(courseId);
        setModules([]);
      }
    } catch (err) {
      console.error("Error fetching course:", err);
      setCourseTitle(courseId);
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  // Add module (local only)
  const handleAddModule = () => {
    if (!newModuleName.trim()) return alert("Enter module name");
    setModules([...modules, { module: newModuleName.trim() }]);
    setNewModuleName("");
  };

  // Edit module (local only)
  const handleEditModule = (index) => {
    const newName = prompt("Enter new module name:", modules[index].module);
    if (!newName) return;
    const updatedModules = [...modules];
    updatedModules[index].module = newName;
    setModules(updatedModules);
  };

  // Delete module (local only)
  const handleDeleteModule = (index) => {
    if (!window.confirm("Delete this module?")) return;
    setModules(modules.filter((_, i) => i !== index));
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h2>Admin: Edit Syllabus (Local Preview) for {courseTitle}</h2>

      {/* Add new module */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="New Module Name"
          value={newModuleName}
          onChange={(e) => setNewModuleName(e.target.value)}
          style={{ padding: "8px", width: "70%", marginRight: "10px" }}
        />
        <button onClick={handleAddModule} style={{ padding: "8px 15px" }}>
          Add Module
        </button>
      </div>

      {/* Modules list */}
      {modules.length === 0 ? (
        <p>No modules yet for this course.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Module Name</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((mod, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{mod.module}</td>
                <td style={{ padding: "8px" }}>
                  <button onClick={() => handleEditModule(index)} style={{ marginRight: "10px" }}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteModule(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}