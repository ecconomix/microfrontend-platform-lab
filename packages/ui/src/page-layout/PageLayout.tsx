import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div
      style={{
        maxWidth: "1024px",
        margin: "0 auto",
        padding: "24px 16px",
      }}
    >
      {children}
    </div>
  );
};
