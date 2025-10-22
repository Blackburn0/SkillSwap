import { useState } from "react";
import { ArrowLeft, Lock, Unlock, Asterisk } from "lucide-react";
import Button from "@/components/ui/Button";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = () => {
    console.log({ currentPassword, newPassword, confirmPassword });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-5 md:px-8 max-w-xl mx-auto w-full">
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition"
          aria-label="Go back"
        >
          <ArrowLeft size={22} className="text-gray-800" />
        </button>
        <h1 className="text-lg md:text-xl font-semibold text-gray-900">
          Password
        </h1>
        <div className="w-6" /> {/* Spacer for alignment */}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-20">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Current Password
            </label>
            <div className="flex items-center gap-3 border border-gray-200 bg-gray-50 rounded-lg px-4 py-3">
              <Lock className="text-gray-500" size={18} />
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              New Password
            </label>
            <div className="flex items-center gap-3 border border-gray-200 bg-gray-50 rounded-lg px-4 py-3">
              <Unlock className="text-gray-500" size={18} />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Confirm New Password
            </label>
            <div className="flex items-center gap-3 border border-gray-200 bg-gray-50 rounded-lg px-4 py-3">
              <Asterisk className="text-gray-500" size={18} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Update Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 md:px-8 shadow-sm">
        <div className="max-w-xl mx-auto">
          <Button
            onClick={handleUpdate}
            fullWidth
            className="bg-red-600 hover:bg-red-700 text-white py-3 text-lg rounded-xl"
          >
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
