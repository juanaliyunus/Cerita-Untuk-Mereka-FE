import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/admin/HomePage";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/auth/AuthPage";
import DonaturSignUp from "./pages/auth/DonaturSignUp";
import OrphanageSignUp from "./pages/auth/OrphanagaseSignUp";
import HomePageOrphanage from "./pages/orphanage/HomePage";
import HomePageDonatur from "./pages/donor/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/donatur-signup" element={<DonaturSignUp />} />
        <Route path="/orphanage-signup" element={<OrphanageSignUp />} />
        <Route path="/orphanage-dashboard" element={<HomePageOrphanage />} />
        <Route path="/donatur-dashboard" element={<HomePageDonatur />} />
      </Routes>
    </>
  );
}

export default App;