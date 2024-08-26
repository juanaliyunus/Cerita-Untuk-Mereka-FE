import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/admin/HomePage";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/auth /AuthPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;