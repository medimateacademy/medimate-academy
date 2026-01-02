import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Panel</h1>

      <button onClick={() => navigate("/admin/courses")}>
        Manage Courses
      </button>

      <br /><br />

      <button onClick={() => navigate("/admin/students")}>
        Manage Students
      </button>
    </div>
  );
}