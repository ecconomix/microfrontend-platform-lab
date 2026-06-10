import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
}

export const Card = ({ children, title }: CardProps) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      {title && (
        <h3
          style={{
            margin: "0 0 12px 0",
            fontSize: "16px",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};
