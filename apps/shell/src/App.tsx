import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { RemoteApp } from "./remotes/RemoteApp";

function App() {
  return (
    <>
      <BrowserRouter>
        <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/dashboard/*"
              element={<RemoteApp name={"dashboard"} />}
            />
            <Route
              path="/settings/*"
              element={<RemoteApp name={"settings"} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
