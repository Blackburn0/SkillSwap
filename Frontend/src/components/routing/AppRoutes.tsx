import { Routes, Route } from 'react-router-dom';
import Onboarding from '@/pages/Onboarding';
import Home from '@/pages/Home';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
