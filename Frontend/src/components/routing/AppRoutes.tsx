import { Routes, Route } from 'react-router-dom';
import Onboarding from '@/pages/Onboarding';
import Home from '@/pages/Home';
import Signup from '../authentication/Signup';
import Login from '../authentication/Login';
import ForgotPassword from '../authentication/ForgotPassword';
import ResetPassword from '../authentication/ResetPassword';
import TeamInfo from '@/pages/TeamInfo';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Team info */}
        <Route path="/info" element={<TeamInfo />} />

        {/* Authentication Pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Onboarding */}
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
