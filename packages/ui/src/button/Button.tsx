import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
}: ButtonProps) => {
  const styles: React.CSSProperties =
    variant === "primary"
      ? {
          padding: "8px 16px",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          fontSize: "14px",
          fontWeight: 500,
        }
      : {
          padding: "8px 16px",
          backgroundColor: "#fff",
          color: "#374151",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          fontSize: "14px",
          fontWeight: 500,
        };

  return (
    <button style={styles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
