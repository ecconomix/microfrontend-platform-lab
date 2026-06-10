import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SettingsHome } from "./pages/SettingsHome";
import { ProfilePage } from "./pages/ProfilePage";
import { PreferencesPage } from "./pages/PreferencesPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <Routes>
          <Route path="/" element={<SettingsHome />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
