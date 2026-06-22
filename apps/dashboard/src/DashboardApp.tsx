import { DashboardHome } from "./pages/DashboardHome";
import "./index.css";

export function DashboardApp() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <DashboardHome />
    </div>
  );
}
