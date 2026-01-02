// src/admin/AdminRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;

      // If no user is logged in, redirect
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Check if the user exists in Admins collection
        const docRef = doc(db, "Admins", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Error checking admin role:", err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Checking admin access...
      </p>
    );
  }

  if (!isAdmin) return <Navigate to="/admin/login" />; // redirect to admin login

  return children;
}