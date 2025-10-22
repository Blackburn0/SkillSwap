import { useState } from 'react';
import {
  Bell,
  Home,
  Briefcase,
  MessageSquare,
  User,
  ChevronLeft,
} from 'lucide-react';
import clsx from 'clsx';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  avatar?: string;
  iconColor?: string;
  unread?: boolean;
  section: 'Today' | 'Yesterday';
}

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('Messages');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New Skill Trade Proposal',
      message: "Alex wants to trade 'Web Design' for 'Copywriting'.",
      time: '10:30 AM',
      avatar: 'https://img.icons8.com/office/40/person-male.png',
      unread: true,
      section: 'Today',
    },
    {
      id: 2,
      title: 'Message from Sarah',
      message: '"Hey! Are you available this weekend?"',
      time: '11:45 AM',
      avatar: 'https://img.icons8.com/office/40/person-male.png',
      unread: false,
      section: 'Today',
    },
    {
      id: 3,
      title: 'Skill Trade Accepted',
      message: 'Your proposal with Mike was accepted.',
      time: '2:15 PM',
      avatar: 'https://img.icons8.com/office/40/person-male.png',
      unread: false,
      section: 'Yesterday',
    },
    {
      id: 4,
      title: 'System Announcement',
      message: 'Scheduled maintenance this Friday at 11 PM.',
      time: '3:30 PM',
      iconColor: 'text-red-500 bg-red-50',
      unread: false,
      section: 'Yesterday',
    },
  ]);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  const grouped = {
    Today: notifications.filter((n) => n.section === 'Today'),
    Yesterday: notifications.filter((n) => n.section === 'Yesterday'),
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-[#FAFAFA] dark:bg-black">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-5 md:px-8 md:pt-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="cursor-pointer rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-black/50"
            aria-label="Go back"
          >
            <ChevronLeft size={26} className="text-gray-800 dark:text-white" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Notifications
          </h1>
        </div>

        <button
          onClick={markAllRead}
          className="cursor-pointer text-sm font-medium text-red-600 hover:underline dark:text-red-500"
        >
          Mark all as read
        </button>
      </header>

      {/* Notifications */}
      <main className="flex-1 overflow-y-auto px-4 pb-24 md:px-8 md:pb-28">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Today */}
          {grouped.Today.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-300">
                Today
              </h2>
              <div className="grid gap-3 md:gap-4">
                {grouped.Today.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm md:p-5 dark:bg-gray-700"
                  >
                    {/* Avatar or Icon */}
                    {n.avatar ? (
                      <img
                        src={n.avatar}
                        alt={n.title}
                        className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
                      />
                    ) : (
                      <div
                        className={clsx(
                          'flex h-10 w-10 items-center justify-center rounded-full md:h-12 md:w-12',
                          n.iconColor ||
                            'text-gray-700dark:text-white bg-gray-100',
                        )}
                      >
                        <Bell size={18} />
                      </div>
                    )}

                    {/* Text */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900 md:text-base dark:text-white">
                          {n.title}
                        </h3>
                        {n.unread && (
                          <span className="h-2 w-2 rounded-full bg-red-500" />
                        )}
                      </div>
                      <p className="mt-0.5 text-sm leading-snug text-gray-600 dark:text-gray-300">
                        {n.message}
                      </p>
                      <p className="mt-2 text-xs text-gray-400 md:text-sm">
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Yesterday */}
          {grouped.Yesterday.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-300">
                Yesterday
              </h2>
              <div className="grid gap-3 md:gap-4">
                {grouped.Yesterday.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm md:p-5 dark:bg-gray-700"
                  >
                    {n.avatar ? (
                      <img
                        src={n.avatar}
                        alt={n.title}
                        className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
                      />
                    ) : (
                      <div
                        className={clsx(
                          'flex h-10 w-10 items-center justify-center rounded-full md:h-12 md:w-12',
                          n.iconColor || 'bg-gray-100 text-gray-700',
                        )}
                      >
                        <Bell size={18} />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 md:text-base dark:text-white">
                        {n.title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-snug text-gray-600 dark:text-gray-300">
                        {n.message}
                      </p>
                      <p className="mt-2 text-xs text-gray-400 md:text-sm dark:text-gray-400">
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed right-0 bottom-0 left-0 hidden items-center justify-around border-t border-gray-200 bg-white py-2 shadow-sm md:py-3">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-around">
          <button
            onClick={() => setActiveTab('Browse')}
            className={clsx(
              'flex flex-col items-center text-xs font-medium',
              activeTab === 'Browse' ? 'text-red-600' : 'text-gray-500',
            )}
          >
            <Home size={20} />
            <span>Browse</span>
          </button>

          <button
            onClick={() => setActiveTab('My Skills')}
            className={clsx(
              'flex flex-col items-center text-xs font-medium',
              activeTab === 'My Skills' ? 'text-red-600' : 'text-gray-500',
            )}
          >
            <Briefcase size={20} />
            <span>My Skills</span>
          </button>

          <button
            onClick={() => setActiveTab('Messages')}
            className={clsx(
              'flex flex-col items-center text-xs font-medium',
              activeTab === 'Messages'
                ? 'rounded-xl bg-red-50 px-3 py-1 text-red-600'
                : 'text-gray-500',
            )}
          >
            <MessageSquare size={20} />
            <span>Messages</span>
          </button>

          <button
            onClick={() => setActiveTab('Profile')}
            className={clsx(
              'flex flex-col items-center text-xs font-medium',
              activeTab === 'Profile' ? 'text-red-600' : 'text-gray-500',
            )}
          >
            <User size={20} />
            <span>Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Notifications;
