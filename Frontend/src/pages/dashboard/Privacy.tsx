import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import clsx from "clsx";

const Privacy = () => {
  // toggles
  const [publicProfile, setPublicProfile] = useState(true);
  const [publicSkills, setPublicSkills] = useState(true);
  const [publicTrades, setPublicTrades] = useState(false);

  // radio
  const [contactOption, setContactOption] = useState<
    "Everyone" | "People with mutual skills" | "No one"
  >("Everyone");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-xl mx-auto px-4 py-5 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            aria-label="back"
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={22} className="text-gray-800" />
          </button>

          <h1 className="text-lg font-semibold text-gray-900">Privacy</h1>

          {/* placeholder to center title */}
          <div className="w-8" />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Profile Visibility Card */}
          <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-lg font-semibold text-gray-900">Profile Visibility</h2>
            </div>

            <div className="divide-y divide-gray-100">
              {/* Public Profile */}
              <div className="flex items-start justify-between px-6 py-4">
                <div className="pr-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">Public Profile</p>
                  <p className="text-sm text-gray-500 mt-1">Anyone can view your profile.</p>
                </div>

                {/* toggle */}
                <button
                  onClick={() => setPublicProfile((v) => !v)}
                  aria-pressed={publicProfile}
                  className={clsx(
                    "relative inline-flex items-center h-7 w-12 rounded-full transition-colors focus:outline-none",
                    publicProfile ? "bg-red-500" : "bg-gray-200"
                  )}
                >
                  <span
                    className={clsx(
                      "inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform",
                      publicProfile ? "translate-x-5" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {/* Public Skills */}
              <div className="flex items-start justify-between px-6 py-4">
                <div className="pr-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">Public Skills</p>
                  <p className="text-sm text-gray-500 mt-1">Your skills are visible to everyone.</p>
                </div>

                <button
                  onClick={() => setPublicSkills((v) => !v)}
                  aria-pressed={publicSkills}
                  className={clsx(
                    "relative inline-flex items-center h-7 w-12 rounded-full transition-colors focus:outline-none",
                    publicSkills ? "bg-red-500" : "bg-gray-200"
                  )}
                >
                  <span
                    className={clsx(
                      "inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform",
                      publicSkills ? "translate-x-5" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {/* Public Trades */}
              <div className="flex items-start justify-between px-6 py-4">
                <div className="pr-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">Public Trades</p>
                  <p className="text-sm text-gray-500 mt-1">Your trade history is public.</p>
                </div>

                <button
                  onClick={() => setPublicTrades((v) => !v)}
                  aria-pressed={publicTrades}
                  className={clsx(
                    "relative inline-flex items-center h-7 w-12 rounded-full transition-colors focus:outline-none",
                    publicTrades ? "bg-red-500" : "bg-gray-200"
                  )}
                >
                  <span
                    className={clsx(
                      "inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform",
                      publicTrades ? "translate-x-5" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Who can contact me Card */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Who can contact me</h3>
            <p className="text-sm text-gray-500 mb-4">
              Choose who can send you trade requests and messages.
            </p>

            <div className="space-y-4">
              {/* Option: Everyone */}
              <label
                className={clsx(
                  "flex items-center justify-between p-2 rounded-lg cursor-pointer",
                  contactOption === "Everyone" ? "bg-red-50" : "hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3">
                  {/* custom radio */}
                  <span
                    className={clsx(
                      "inline-flex items-center justify-center w-5 h-5 rounded-full border",
                      contactOption === "Everyone"
                        ? "bg-red-500 border-red-500"
                        : "bg-white border-gray-300"
                    )}
                  >
                    {contactOption === "Everyone" && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </span>

                  <span className={clsx("text-sm font-medium", contactOption === "Everyone" ? "text-gray-900" : "text-gray-700")}>
                    Everyone
                  </span>
                </div>

                <input
                  name="contact"
                  type="radio"
                  className="hidden"
                  checked={contactOption === "Everyone"}
                  onChange={() => setContactOption("Everyone")}
                />
              </label>

              {/* Option: People with mutual skills */}
              <label
                className={clsx(
                  "flex items-center justify-between p-2 rounded-lg cursor-pointer",
                  contactOption === "People with mutual skills" ? "bg-red-50" : "hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={clsx(
                      "inline-flex items-center justify-center w-5 h-5 rounded-full border",
                      contactOption === "People with mutual skills"
                        ? "bg-red-500 border-red-500"
                        : "bg-white border-gray-300"
                    )}
                  >
                    {contactOption === "People with mutual skills" && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </span>

                  <span className={clsx("text-sm font-medium", contactOption === "People with mutual skills" ? "text-gray-900" : "text-gray-700")}>
                    People with mutual skills
                  </span>
                </div>

                <input
                  name="contact"
                  type="radio"
                  className="hidden"
                  checked={contactOption === "People with mutual skills"}
                  onChange={() => setContactOption("People with mutual skills")}
                />
              </label>

              {/* Option: No one */}
              <label
                className={clsx(
                  "flex items-center justify-between p-2 rounded-lg cursor-pointer",
                  contactOption === "No one" ? "bg-red-50" : "hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={clsx(
                      "inline-flex items-center justify-center w-5 h-5 rounded-full border",
                      contactOption === "No one" ? "bg-red-500 border-red-500" : "bg-white border-gray-300"
                    )}
                  >
                    {contactOption === "No one" && <span className="w-2 h-2 rounded-full bg-white" />}
                  </span>

                  <span className={clsx("text-sm font-medium", contactOption === "No one" ? "text-gray-900" : "text-gray-700")}>
                    No one
                  </span>
                </div>

                <input
                  name="contact"
                  type="radio"
                  className="hidden"
                  checked={contactOption === "No one"}
                  onChange={() => setContactOption("No one")}
                />
              </label>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom nav aligned to the same grid (max-w-xl) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-xl mx-auto flex justify-around items-center py-2 md:py-3">
          <button className="flex flex-col items-center text-sm text-gray-500">
            <span>Browse</span>
          </button>
          <button className="flex flex-col items-center text-sm text-gray-500">
            <span>My Skills</span>
          </button>
          <button className="flex flex-col items-center text-sm text-gray-500">
            <span>Messages</span>
          </button>
          <button className="flex flex-col items-center text-sm text-red-600">
            <span>Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Privacy;
