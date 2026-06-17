import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardHome } from "./pages/DashboardHome";
import { StatsPage } from "./pages/StatsPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter basename="/dashboard">
      <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
