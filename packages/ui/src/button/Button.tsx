export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      style={{
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};
