export default function Footer() {
  return (
    <footer
      style={{
        background: "#020617",
        color: "white",
        padding: "30px",
        textAlign: "center",
        marginTop: "40px"
      }}
    >

      <p style={{ fontSize: "14px", opacity: 0.7 }}>
        © {new Date().getFullYear()} MediMate Academy. All rights reserved.
      </p>
    </footer>
  );
}