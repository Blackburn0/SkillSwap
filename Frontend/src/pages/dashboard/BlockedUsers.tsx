import Button from '@/components/ui/Button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const account = [
  {
    img: 'https://img.icons8.com/office/40/person-male.png',
    name: 'Ethan Carter',
    dateBlocked: 'Jan 15, 2024',
  },
  {
    img: 'https://img.icons8.com/office/40/person-female.png',
    name: 'Sophia Bennett',
    dateBlocked: 'Feb 20, 2024',
  },
  {
    img: 'https://img.icons8.com/office/40/person-male.png',
    name: 'Liam Harper',
    dateBlocked: 'March 10, 2024',
  },
];

const BlockedUsers = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col bg-stone-50 py-2 pb-20 dark:bg-gray-900">
      {/* Header */}
      <div className="relative flex items-center justify-center border-b-2 border-gray-200 pt-2 pb-4 dark:border-gray-700">
        <ChevronLeft
          size={28}
          className="absolute left-2 cursor-pointer text-gray-900 dark:text-gray-100"
          onClick={() => navigate(-1)}
        />
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Blocked Users
          </h1>
        </div>
      </div>

      <div className="space-y-4 bg-stone-50/50 px-4 pt-4 dark:bg-gray-900">
        <h2 className="text-base font-medium text-gray-500 dark:text-gray-300">
          You won't see their posts or messages, and they won't see yours.
        </h2>

        {/* Blocked Users */}
        {account.map((item, idx) => (
          <div
            key={idx}
            className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-xs transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {/* Icon + Text Row */}
            <div className="flex items-center space-x-4 text-left">
              <div className="rounded-sm border-transparent bg-red-100/50 p-2.5 text-gray-700 dark:bg-red-100/20 dark:text-red-500">
                <img src={item.img} alt="Profile Photo" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {item.name}
                </h2>
                <p className="text-base font-semibold text-gray-500 dark:text-gray-300">
                  {item.dateBlocked}
                </p>
              </div>
            </div>

            <Button className="w-auto! bg-gray-100! py-2! hover:bg-gray-300! dark:bg-gray-700! dark:text-gray-100 dark:hover:bg-gray-600!">
              Unblock
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockedUsers;
