import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const nav = ['All', 'Pending', 'Active', 'Completed'];

const trades = [
  {
    img: 'https://img.icons8.com/office/40/person-male.png',
    name: 'Alex',
    status: 'Pending',
  },
  {
    img: 'https://img.icons8.com/office/40/person-female.png',
    name: 'Sarah',
    status: 'Active',
  },
  {
    img: 'https://img.icons8.com/office/40/person-male.png',
    name: 'John',
    status: 'Completed',
  },
  {
    img: 'https://img.icons8.com/office/40/person-female.png',
    name: 'Anna',
    status: 'Pending',
  },
];

const Trade = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const filteredTrades =
    activeTab === 'All'
      ? trades
      : trades.filter((trade) => trade.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Active':
        return 'bg-blue-100 text-blue-700';
      case 'Completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="mx-auto max-w-xl pt-5">
      {/* Header */}
      <div className="relative mb-8 flex items-center justify-center">
        <ChevronLeft
          size={28}
          className="absolute left-0 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold">Trades</h1>
      </div>

      {/* Navigation Tabs */}
      <nav className="border-b border-gray-200 px-4">
        <ul className="flex justify-start space-x-10 text-sm font-medium">
          {nav.map((link) => (
            <li
              key={link}
              className={`relative cursor-pointer pb-4 font-bold transition-colors ${
                activeTab === link ? 'text-red-500' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(link)}
            >
              {link}
              {activeTab === link && (
                <span className="absolute right-0 bottom-0 left-0 mx-auto mt-2 h-[3px] w-full bg-red-500"></span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Trade List */}
      <div className="space-y-4 bg-stone-50/50 px-4 pt-6 pb-10">
        {filteredTrades.map((trade, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <img
                src={trade.img}
                alt={trade.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-900">
                  Skill Trade with {trade.name}
                </p>
                <span
                  className={`mt-1 inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusColor(
                    trade.status,
                  )}`}
                >
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      trade.status === 'Pending'
                        ? 'bg-yellow-500'
                        : trade.status === 'Active'
                          ? 'bg-blue-500'
                          : trade.status === 'Completed'
                            ? 'bg-green-500'
                            : 'bg-gray-400'
                    }`}
                  ></div>
                  {trade.status}
                </span>
              </div>
            </div>

            <ChevronRight size={20} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trade;
