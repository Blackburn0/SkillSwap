import {
  ArrowLeftRight,
  Bell,
  MessageSquare,
  MessageSquareDot,
  PlusCircle,
  Settings,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const activeTradeData = [
  {
    img: 'https://img.icons8.com/office/40/person-male.png',
    name: 'Alex',
    desc: 'Photography for Web Design',
    url: '',
    senderProfileurl: '',
  },
  {
    img: 'https://img.icons8.com/office/40/person-female.png',
    name: 'Sarah',
    desc: 'Copywriting for SEO',
    url: '',
    senderProfileurl: '',
  },
];

const quickLinksData = [
  {
    icon: PlusCircle,
    title: 'New Listing',
    url: '/dashboard/listing',
  },
  {
    icon: ArrowLeftRight,
    title: 'Find a Trade',
    url: '/dashboard/trade',
  },
  {
    icon: Star,
    title: 'My Reviews',
    url: '/dashboard/reviews',
  },
  {
    icon: Settings,
    title: 'Settings',
    url: '/dashboard/settings',
  },
];

const DashboardHome = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Profile Header */}
      <div className="flex items-center justify-between bg-red-500 px-4 pt-10 pb-26 text-white">
        <div className="flex items-center justify-center space-x-3">
          <div
            className="cursor-pointer rounded-full border bg-white p-1"
            onClick={() => navigate('/dashboard/profile')}
          >
            <img
              src="https://img.icons8.com/office/40/person-male.png"
              alt="User Profile Photo"
              className="h-8 w-8"
            />
          </div>
          <div>
            <h1 className="text-sm">Welcome back,</h1>
            <p className="text-2xl font-medium">John Doe</p>
          </div>
        </div>
        <div
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-transparent bg-white/20"
          onClick={() => navigate('/dashboard/notification')}
        >
          <Bell size={18} />
        </div>
      </div>

      {/* Active Trades */}
      <div className="mx-4 -mt-10 rounded-xl border-transparent bg-white p-4 shadow-xl">
        <div className="flex justify-between space-y-4">
          <h2 className="text-lg font-bold">Active Trades</h2>
          <a className="cursor-pointer text-sm font-medium text-red-500 underline-offset-2 hover:underline">
            View All
          </a>
        </div>
        <div>
          {activeTradeData.map((trade, idx) => (
            <div className="flex items-center justify-between">
              {' '}
              <div
                key={idx}
                className="mb-4 flex items-center space-x-3 text-left"
              >
                <div
                  className="cursor-pointer rounded-full border-transparent bg-stone-200 p-1"
                  onClick={() => navigate(trade.senderProfileurl)}
                >
                  <img
                    src={trade.img}
                    alt="User Profile Photo"
                    className="h-8 w-8"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Trade with {trade.name}</h3>
                  <p className="text-sm text-gray-700">{trade.desc}</p>
                </div>
              </div>
              {idx === 0 ? (
                <div
                  className="cursor-pointer text-red-600"
                  onClick={() => navigate(trade.url)}
                >
                  <MessageSquareDot size={20} />
                </div>
              ) : (
                <div
                  className="cursor-pointer text-gray-700"
                  onClick={() => navigate(trade.url)}
                >
                  <MessageSquare size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mx-4 my-10">
        <h3 className="mb-5 text-left text-lg font-bold">Quick Links</h3>
        <div className="grid grid-cols-2 gap-6 bg-white">
          {quickLinksData.map((link, idx) => (
            <div
              key={idx}
              className="flex cursor-pointer flex-col items-center rounded-xl border-transparent p-10 shadow-md hover:bg-gray-50/70"
              onClick={() => navigate(link.url)}
            >
              <div className="mb-2 rounded-full border-transparent bg-red-200/30 p-4 text-red-700">
                <link.icon size={18} />
              </div>
              <div className="text-lg font-semibold text-gray-700">
                New Listing
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

/* TODO: */
// use this icon to show unread/new messages: <MessageSquareDot />
