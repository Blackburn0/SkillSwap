import { useState } from "react";
import { ArrowLeft, Bell, Home, Briefcase, MessageSquare, User } from "lucide-react";
import clsx from "clsx";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  avatar?: string;
  iconColor?: string;
  unread?: boolean;
  section: "Today" | "Yesterday";
}

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("Messages");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Skill Trade Proposal",
      message: "Alex wants to trade 'Web Design' for 'Copywriting'.",
      time: "10:30 AM",
      avatar: "https://img.icons8.com/office/40/person-male.png",
      unread: true,
      section: "Today",
    },
    {
      id: 2,
      title: "Message from Sarah",
      message: '"Hey! Are you available this weekend?"',
      time: "11:45 AM",
      avatar: "https://img.icons8.com/office/40/person-male.png",
      unread: false,
      section: "Today",
    },
    {
      id: 3,
      title: "Skill Trade Accepted",
      message: "Your proposal with Mike was accepted.",
      time: "2:15 PM",
      avatar: "https://img.icons8.com/office/40/person-male.png",
      unread: false,
      section: "Yesterday",
    },
    {
      id: 4,
      title: "System Announcement",
      message: "Scheduled maintenance this Friday at 11 PM.",
      time: "3:30 PM",
      iconColor: "text-red-500 bg-red-50",
      unread: false,
      section: "Yesterday",
    },
  ]);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  const grouped = {
    Today: notifications.filter((n) => n.section === "Today"),
    Yesterday: notifications.filter((n) => n.section === "Yesterday"),
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-5 md:px-8 md:pt-8 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Go back"
          >
            <ArrowLeft size={22} className="text-gray-800" />
          </button>
          <h1 className="text-lg md:text-xl font-semibold text-gray-900">
            Notifications
          </h1>
        </div>

        <button
          onClick={markAllRead}
          className="text-red-600 text-sm font-medium hover:underline"
        >
          Mark all as read
        </button>
      </header>

      {/* Notifications */}
      <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-24 md:pb-28">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Today */}
          {grouped.Today.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-500 mb-2">Today</h2>
              <div className="grid gap-3 md:gap-4">
                {grouped.Today.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 bg-white p-4 md:p-5 rounded-xl shadow-sm"
                  >
                    {/* Avatar or Icon */}
                    {n.avatar ? (
                      <img
                        src={n.avatar}
                        alt={n.title}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={clsx(
                          "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full",
                          n.iconColor || "bg-gray-100 text-gray-700"
                        )}
                      >
                        <Bell size={18} />
                      </div>
                    )}

                    {/* Text */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm md:text-base font-semibold text-gray-900">
                          {n.title}
                        </h3>
                        {n.unread && (
                          <span className="w-2 h-2 bg-red-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5 leading-snug">
                        {n.message}
                      </p>
                      <p className="text-xs md:text-sm text-gray-400 mt-2">
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
              <h2 className="text-sm font-semibold text-gray-500 mb-2">
                Yesterday
              </h2>
              <div className="grid gap-3 md:gap-4">
                {grouped.Yesterday.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 bg-white p-4 md:p-5 rounded-xl shadow-sm"
                  >
                    {n.avatar ? (
                      <img
                        src={n.avatar}
                        alt={n.title}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={clsx(
                          "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full",
                          n.iconColor || "bg-gray-100 text-gray-700"
                        )}
                      >
                        <Bell size={18} />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="text-sm md:text-base font-semibold text-gray-900">
                        {n.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-0.5 leading-snug">
                        {n.message}
                      </p>
                      <p className="text-xs md:text-sm text-gray-400 mt-2">
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
<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 md:py-3 shadow-sm">
  <div className="max-w-2xl mx-auto w-full flex justify-around items-center">
    <button
      onClick={() => setActiveTab("Browse")}
      className={clsx(
        "flex flex-col items-center text-xs font-medium",
        activeTab === "Browse" ? "text-red-600" : "text-gray-500"
      )}
    >
      <Home size={20} />
      <span>Browse</span>
    </button>

    <button
      onClick={() => setActiveTab("My Skills")}
      className={clsx(
        "flex flex-col items-center text-xs font-medium",
        activeTab === "My Skills" ? "text-red-600" : "text-gray-500"
      )}
    >
      <Briefcase size={20} />
      <span>My Skills</span>
    </button>

    <button
      onClick={() => setActiveTab("Messages")}
      className={clsx(
        "flex flex-col items-center text-xs font-medium",
        activeTab === "Messages"
          ? "text-red-600 bg-red-50 rounded-xl px-3 py-1"
          : "text-gray-500"
      )}
    >
      <MessageSquare size={20} />
      <span>Messages</span>
    </button>

    <button
      onClick={() => setActiveTab("Profile")}
      className={clsx(
        "flex flex-col items-center text-xs font-medium",
        activeTab === "Profile" ? "text-red-600" : "text-gray-500"
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
