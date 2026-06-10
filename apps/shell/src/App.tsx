import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard/*"
            element={
              <div style={{ padding: "24px 16px", maxWidth: "1024px", margin: "0 auto" }}>
                <p style={{ color: "#6b7280", fontSize: "14px" }}>
                  Dashboard app — run separately on port 3001
                </p>
              </div>
            }
          />
          <Route
            path="/settings/*"
            element={
              <div style={{ padding: "24px 16px", maxWidth: "1024px", margin: "0 auto" }}>
                <p style={{ color: "#6b7280", fontSize: "14px" }}>
                  Settings app — run separately on port 3002
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
