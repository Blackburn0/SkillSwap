import { useNavigate } from 'react-router-dom';
import { Mail, ChevronLeft } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { validateEmail } from '@/utils/ValidateEmail';
import { useEnterKey } from '@/hooks/useEnterKey';
import { useCrud, type EntityWithId } from '@/hooks/useCrud';

interface ResetRequest extends EntityWithId {
  id: number;
}

// Define the payload type (what we send to the API).
interface ForgotPasswordPayload {
  email: string;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Initialize useCrud for the 'forgot-password' endpoint

  const { createItem, loading } = useCrud<ResetRequest>(
    `${API_BASE_URL}/auth/password/forgot/`,
  );

  const [email, setEmail] = useState('');

  // Update the handler to be async and use the API hook
  const handleForgotPassword = async () => {
    //  Client-side Validation ---
    if (!validateEmail(email)) {
      showToast('Please enter a valid email address', 'info');
      return;
    }

    const payload: ForgotPasswordPayload = { email };

    // API Call (Create Operation) ---
    try {
      // The createItem function sends the POST request
      await createItem(payload as any);
      // Success Handling ---
      showToast('Password reset email sent! Check your inbox.', 'success');

      // Navigate to login page
      navigate('/login');
    } catch (err) {
      // Error Handling ---
      const errorMessage =
        (err as Error).message ||
        'Failed to send reset link. Please try again.';
      showToast(errorMessage, 'error');
    }
  };

  //  Trigger forgotPassword on Enter key
  useEnterKey(handleForgotPassword);

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-white px-4 py-8">
      <div title="back">
        <ChevronLeft
          size={28}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="mt-14 flex flex-col text-center">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            Forgot your password?
          </h1>
          <p className="mt-2 text-gray-600">
            No worries! Enter your email address below and we'll send you a link
            to reset your password
          </p>
        </div>

        <div className="mt-10 mb-5 flex flex-col space-y-6">
          {/* Email */}
          <Input
            icon={<Mail size={18} />}
            placeholderText="Your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="text-center">
          <Button
            className="mb-4"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          <p className="text-sm font-medium text-gray-600">
            Remember your password?{' '}
            <span
              onClick={() => navigate('/login')}
              className="cursor-pointer text-red-600 hover:underline hover:underline-offset-2"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
