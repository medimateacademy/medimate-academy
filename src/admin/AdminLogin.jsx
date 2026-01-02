import { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Reset error
    try {
      // Sign in with Firebase Auth
      const cred = await signInWithEmailAndPassword(auth, email, password);

      // Verify admin role in Firestore
      const adminRef = doc(db, "Admins", cred.user.uid);
      const adminSnap = await getDoc(adminRef);

      if (!adminSnap.exists()) {
        // Not an admin → force logout
        await auth.signOut();
        setError("You are not authorized as admin!");
        return;
      }

      // Admin verified → navigate to dashboard
      navigate("/admin");
    } catch (err) {
      setError("Invalid credentials or network error.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: "400px", margin: "auto" }}>
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
      />
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}