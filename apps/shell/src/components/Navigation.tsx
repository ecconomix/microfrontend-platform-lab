import { NavLink } from "react-router-dom";
import { mockNavigation } from "@platform/contracts";

export const Navigation = () => {
  return (
    <nav
      style={{
        backgroundColor: "#1e293b",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        height: "56px",
      }}
    >
      <span
        style={{
          color: "#f8fafc",
          fontWeight: 700,
          fontSize: "16px",
          marginRight: "24px",
        }}
      >
        Platform Lab
      </span>
      {mockNavigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          style={({ isActive }) => ({
            color: isActive ? "#38bdf8" : "#94a3b8",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 500,
            padding: "6px 12px",
            borderRadius: "4px",
            backgroundColor: isActive ? "rgba(56,189,248,0.1)" : "transparent",
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};
