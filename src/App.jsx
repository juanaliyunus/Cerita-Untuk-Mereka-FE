import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/admin/HomePage";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/auth/AuthPage";
import DonaturSignUp from "./pages/auth/DonaturSignUp";
import OrphanageSignUp from "./pages/auth/OrphanageSignUp";
import HomePageOrphanage from "./pages/orphanage/HomePage";
import OrphanagaseListPage from "./pages/donor/OrphanagaseListPage";
import DonatePage from "./pages/donor/DonatePage";
import DonaturPage from "./pages/donor/DonaturPage";
import NotFoundPage from "./pages/404NotFound";
import AboutPages from "./pages/aboutPages";
import RequestBook from "./pages/orphanage/RequestBook";
import ConfirmBook from "./pages/orphanage/ConfirmBook";
import ProfileOrphanage from "./pages/orphanage/ProfileOrphanage";
import CheckDonation from "./pages/donor/CheckDonation";
import ListUsers from "./pages/admin/ListUsers";
import ListOrphanages from "./pages/admin/ListOrphanages";
import ConfirmBooks from "./pages/admin/ConfirmBooks";
import HistoryDonationOrphanage from "./pages/orphanage/HistoryDonationOrphanage";
import PrivateRoute from "./service/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={
          <PrivateRoute roles={['ROLE_ADMIN']}>
            <HomePage />
          </PrivateRoute>
        } />
        <Route path="/admin-dashboard" element={
          <PrivateRoute roles={['ROLE_ADMIN']}>
            <HomePage />
          </PrivateRoute>
        } />
        <Route path="/admin-ListUsers" element={
          <PrivateRoute roles={['ROLE_ADMIN']}>
            <ListUsers />
          </PrivateRoute>
        } />
        <Route path="/admin-ListOrphanage" element={
          <PrivateRoute roles={['ROLE_ADMIN']}>
            <ListOrphanages />
          </PrivateRoute>
        } />
        <Route path="/admin-confirmBook" element={
          <PrivateRoute roles={['ROLE_ADMIN']}>
            <ConfirmBooks />
          </PrivateRoute>
        } />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/donatur-signup" element={<DonaturSignUp />} />
        <Route path="/donatur-dashboard" element={
          <PrivateRoute roles={['ROLE_DONOR']}>
            <LandingPage />
          </PrivateRoute>
        } />
        <Route path="/donatur-orphanageList" element={
          <PrivateRoute roles={['ROLE_DONOR']}>
            <OrphanagaseListPage />
          </PrivateRoute>
        } />
        <Route path="/donatur-donate" element={
          <PrivateRoute roles={['ROLE_DONOR']}>
            <DonatePage />
          </PrivateRoute>
        } />
        <Route path="/donatur-profile" element={
          <PrivateRoute roles={['ROLE_DONOR']}>
            <DonaturPage />
          </PrivateRoute>
        } />
        <Route path="/about" element={<AboutPages />} />
        <Route path="/orphanage-requestBook" element={
          <PrivateRoute roles={['ROLE_ORPHANAGES']}>
            <RequestBook />
          </PrivateRoute>
        } />
        <Route path="/orphanage-signup" element={<OrphanageSignUp />} />
        <Route path="/orphanage-dashboard" element={
          <PrivateRoute roles={['ROLE_ORPHANAGES']}>
            <HomePageOrphanage />
          </PrivateRoute>
        } />
        <Route path="/orphanage-confirmBook" element={
          <PrivateRoute roles={['ROLE_ORPHANAGES']}>
            <ConfirmBook />
          </PrivateRoute>
        } />
        <Route path="/orphanage-profile" element={
          <PrivateRoute roles={['ROLE_ORPHANAGES']}>
            <ProfileOrphanage />
          </PrivateRoute>
        } />
        <Route path="/history-donation-orphanage" element={
          <PrivateRoute roles={['ROLE_ORPHANAGES']}>
            <HistoryDonationOrphanage />
          </PrivateRoute>
        } />
        <Route path="/donatur-checkDonation" element={
          <PrivateRoute roles={['ROLE_DONOR']}>
            <CheckDonation />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;