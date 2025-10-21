import { Routes, Route } from 'react-router-dom';
import Onboarding from '@/pages/Onboarding';
import Home from '@/pages/Home';
import Signup from '../authentication/Signup';
import Login from '../authentication/Login';
import ForgotPassword from '../authentication/ForgotPassword';
import ResetPassword from '../authentication/ResetPassword';
import TeamInfo from '@/pages/TeamInfo';
import DashboardLayout from '@/layouts/DashboardLayout';
import DashboardHome from '@/pages/dashboard/Home';
import Profile from '@/pages/dashboard/Profile';
import Listing from '@/pages/dashboard/Listing';
import Trade from '@/pages/dashboard/Trade';
import Messages from '@/pages/dashboard/Messages';
import Notifications from '@/pages/dashboard/Notifications';
import Settings from '@/pages/dashboard/Settings';
import Preferences from '@/pages/dashboard/Preferences';
import TradeDetails from '@/pages/dashboard/TradeDetails';
import ProposeTrade from '@/pages/dashboard/ProposeTrade';
import Filters from '@/pages/dashboard/Filters';
import PaymentMethods from '@/pages/dashboard/PaymentMethods';
import BlockedUsers from '@/pages/dashboard/BlockedUsers';
import NotFound from '@/pages/dashboard/404';

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

        {/* Parent Dashboard route */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="trade" element={<Trade />} />
          <Route path="listing" element={<Listing />} />
          <Route path="filter-listing" element={<Filters />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="trade-details" element={<TradeDetails />} />
          <Route path="propose-trade" element={<ProposeTrade />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/preferences" element={<Preferences />} />
          <Route path="settings/payment" element={<PaymentMethods />} />
          <Route path="settings/blocked" element={<BlockedUsers />} />
        </Route>

        {/* Do not share the dashboard layout but part of the dashboard */}
        <Route path="/dashboard/notification" element={<Notifications />} />
        <Route path="/dashboard/notification" element={<Notifications />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
