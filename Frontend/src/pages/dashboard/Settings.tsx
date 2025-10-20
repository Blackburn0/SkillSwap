import {
  ChevronLeft,
  CircleQuestionMark,
  CreditCard,
  LockKeyhole,
  Shield,
  User2,
  Mail,
  ChevronRight,
  Bell,
  Ban,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const account = [
  { icon: User2, title: 'Profile', desc: 'Update your profile information' },
  { icon: LockKeyhole, title: 'Password', desc: 'Change your password' },
  {
    icon: CreditCard,
    title: 'Payment Methods',
    desc: 'Manage your payment methods',
  },
];

const privacy = [
  {
    icon: Shield,
    title: 'Privacy Settings',
    desc: 'Manage your privacy settings',
  },
  {
    icon: Ban,
    title: 'Blocked Users',
    desc: 'Block or unblock users',
  },
];

const support = [
  {
    icon: CircleQuestionMark,
    title: 'Help Center',
    desc: 'Get help with the app',
  },
  { icon: Mail, title: 'Contact', desc: 'Contact us for support' },
];

const Settings = () => {
  const navigate = useNavigate();

  const renderCard = (items: typeof account) => (
    <div className="divide-y divide-gray-200 rounded-lg border-transparent bg-white shadow-sm">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-gray-50"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="rounded-full border-transparent bg-red-100/50 p-2">
              <item.icon size={20} className="text-red-600" />
            </div>
            <div>
              <h2 className="font-medium text-gray-900">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </div>
          <ChevronRight size={22} className="text-gray-400" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="mx-auto my-2 flex min-h-screen max-w-xl flex-col pb-20">
      {/* Header */}
      <div className="relative flex items-center justify-center border-b-2 border-gray-200 pt-2 pb-4">
        <ChevronLeft
          size={28}
          className="absolute left-2 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="text-center">
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </div>

      <div className="space-y-6 bg-stone-50/50 px-4 pt-4">
        {/* Account */}
        <div className="space-y-2">
          <span className="block text-left text-sm font-bold text-gray-600">
            ACCOUNT
          </span>
          {renderCard(account)}
        </div>

        {/* Notifications */}
        <div className="space-y-2">
          <span className="block text-left text-sm font-bold text-gray-600">
            NOTIFICATIONS
          </span>
          {renderCard([
            {
              icon: Bell,
              title: 'Preferences',
              desc: 'Customize your notifications',
            },
          ])}
        </div>

        {/* Privacy */}
        <div className="space-y-2">
          <span className="block text-left text-sm font-bold text-gray-600">
            PRIVACY
          </span>
          {renderCard(privacy)}
        </div>

        {/* Support */}
        <div className="space-y-2">
          <span className="block text-left text-sm font-bold text-gray-600">
            SUPPORT
          </span>
          {renderCard(support)}
        </div>
      </div>
    </div>
  );
};

export default Settings;
