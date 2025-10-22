import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { AlertCircle } from 'lucide-react';

const DeleteAccount = () => {
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const handleDelete = () => {
    if (!checked || !password.trim()) return;
    // TODO: Replace this with actual delete logic or API call
    console.log('Account permanently deleted.');
  };

  return (
    <main className="flex flex-col min-h-screen bg-white text-center px-6 py-8">
      {/* Header */}
      <header className="flex items-center mb-8">
        <button
          onClick={() => window.history.back()}
          className="text-gray-800 text-base font-medium flex items-center"
        >
          ←
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">Delete Account</h1>
      </header>

      {/* Main Content */}
      <section className="flex-1 flex flex-col items-center max-w-xl mx-auto space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-red-50 p-4 rounded-full">
            <AlertCircle className="text-red-500 w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Are you sure?</h2>
            <p className="text-gray-600 mt-2 max-w-sm">
              Deleting your account is a permanent action and cannot be undone.
              All your data, including your profile, skills, and messages, will be
              permanently removed.
            </p>
          </div>
        </div>

        {/* Password Input */}
        <div className="w-full">
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password to confirm"
            className="w-full"
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-start space-x-3 text-left w-full">
          <input
            type="checkbox"
            id="confirmDelete"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-1 w-4 h-4 accent-red-500"
          />
          <label htmlFor="confirmDelete" className="text-sm text-gray-700 leading-snug">
            I understand this action is irreversible and I want to permanently
            delete my account.
          </label>
        </div>
      </section>

      {/* Delete Button */}
      <footer className="mt-auto w-full max-w-xl mx-auto">
        <Button
          onClick={handleDelete}
          className={`py-3 text-lg font-semibold w-full ${
            checked && password.trim()
              ? 'bg-[#F87171]'
              : 'bg-red-300 cursor-not-allowed'
          }`}
        >
          Delete My Account
        </Button>
      </footer>
    </main>
  );
};

export default DeleteAccount;
