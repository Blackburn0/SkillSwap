import { useNavigate } from 'react-router-dom';
import { Mail, ChevronLeft } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { validateEmail } from '@/utils/ValidateEmail';
import { useEnterKey } from '@/hooks/useEnterKey';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    if (!validateEmail(email)) {
      showToast('Please enter a valid email address', 'info');
      return;
    } else if (email)
      showToast('Please check your email for the reset link.', 'success');
    navigate('/reset-password');
  };

  //  Trigger forgotPassword on Enter key
  useEnterKey(handleForgotPassword);

  return (
    <div className="mx-auto min-h-screen max-w-lg px-4 py-8">
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
          <Button className="mb-4" onClick={handleForgotPassword}>
            Send Reset Link
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
