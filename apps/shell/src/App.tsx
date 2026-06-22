import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { DashboardApp } from "@repo/dashboard";
import { SettingsApp } from "@repo/settings";

function App() {
  return (
    <>
      <BrowserRouter>
        <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard/*" element={<DashboardApp />} />
            <Route path="/settings/*" element={<SettingsApp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
