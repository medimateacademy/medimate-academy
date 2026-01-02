import { Routes, Route, Navigate, useParams } from "react-router-dom";

/* Layout */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* Public Pages */
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

/* Student */
import Dashboard from "./pages/Dashboard";
import StudyMaterial from "./pages/StudyMaterial";

/* Legal */
import Terms from "./pages/Terms";

/* Admin */
import AdminRoute from "./admin/AdminRoute";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminCourses from "./admin/AdminCourses";
import AdminStudents from "./admin/AdminStudents";
import AdminCourseDetails from "./admin/AdminCourseDetails"; // New

function AdminCourseDetailsWrapper() {
  const { courseId } = useParams();
  return <AdminCourseDetails courseId={courseId} />;
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:Id" element={<CourseDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Student */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/study/:courseId" element={<StudyMaterial />} />

        {/* Legal */}
        <Route path="/terms" element={<Terms />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminRoute>
              <AdminCourses />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <AdminRoute>
              <AdminStudents />
            </AdminRoute>
          }
        />

        {/* Admin Course Syllabus Editor */}
        <Route
          path="/admin/course/:courseId"
          element={
            <AdminRoute>
              <AdminCourseDetailsWrapper />
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;