// src/layouts/DashboardLayout.tsx
import {
  ArrowLeftRight,
  LayoutDashboardIcon,
  MessageSquare,
  Search,
  User2,
} from 'lucide-react';
import { Outlet, NavLink } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-stone-50/50 text-center sm:border-transparent sm:shadow-lg">
      {/* Page Content */}
      <main className="flex-1">
        <Outlet /> {/* This renders the nested routes */}
      </main>

      {/* Footer Nav links */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-white pt-2">
        <div className="mx-auto max-w-xl px-4">
          <nav className="flex justify-between text-sm font-medium text-gray-700">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-2 py-1 transition-colors ${
                  isActive
                    ? 'font-semibold text-red-600'
                    : 'text-gray-600 hover:text-red-500'
                }`
              }
            >
              <LayoutDashboardIcon size={18} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="trade"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-2 py-1 transition-colors ${
                  isActive
                    ? 'font-semibold text-red-600'
                    : 'text-gray-600 hover:text-red-500'
                }`
              }
            >
              <ArrowLeftRight size={18} />
              <span>Trades</span>
            </NavLink>

            <NavLink
              to="listing"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-2 py-1 transition-colors ${
                  isActive
                    ? 'font-semibold text-red-600'
                    : 'text-gray-600 hover:text-red-500'
                }`
              }
            >
              <Search size={18} />
              <span>Browse</span>
            </NavLink>

            <NavLink
              to="messages"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-2 py-1 transition-colors ${
                  isActive
                    ? 'font-semibold text-red-600'
                    : 'text-gray-600 hover:text-red-500'
                }`
              }
            >
              <MessageSquare size={18} />
              <span>Messages</span>
            </NavLink>

            <NavLink
              to="profile"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-2 py-1 transition-colors ${
                  isActive
                    ? 'font-semibold text-red-600'
                    : 'text-gray-600 hover:text-red-500'
                }`
              }
            >
              <User2 size={18} />
              <span>Profile</span>
            </NavLink>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
