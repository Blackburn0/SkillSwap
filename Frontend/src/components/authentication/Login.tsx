import { useNavigate } from 'react-router-dom';
import { Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { usePasswordToggle } from '@/hooks/usePasswordToggle';
import { validateEmail } from '@/utils/ValidateEmail';
import { useToast } from '@/hooks/useToast';
import { useState } from 'react';
import { useEnterKey } from '@/hooks/useEnterKey';

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordToggle = usePasswordToggle();

  const handleLogin = () => {
    if (!validateEmail(email)) {
      showToast('Please enter a valid email address', 'info');
      return;
    }
    showToast('Good to see you. Welcome back!', 'success');
  };

  //  Trigger login on Enter key
  useEnterKey(handleLogin);

  return (
    <div className="mx-auto min-h-screen max-w-lg px-4 py-8">
      <div className="mt-14 flex flex-col text-center">
        <div>
          <h1 className="text-3xl font-bold md:text-3xl">Swapo</h1>
          <p className="mt-1 font-medium text-gray-600">Welcome back!</p>
        </div>

        <div className="mt-10 flex flex-col space-y-6">
          {/* Email */}
          <Input
            icon={<Mail size={18} />}
            placeholderText="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <Input
            icon={<LockKeyhole size={18} />}
            placeholderText="Password"
            type={passwordToggle.inputType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              passwordToggle.visible ? (
                <EyeOff
                  size={18}
                  className="cursor-pointer text-gray-500"
                  onClick={passwordToggle.toggleVisibility}
                />
              ) : (
                <Eye
                  size={18}
                  className="cursor-pointer text-gray-500"
                  onClick={passwordToggle.toggleVisibility}
                />
              )
            }
          />
        </div>
        <div
          onClick={() => navigate('/forgot-password')}
          className="mb-8 cursor-pointer py-2 text-right text-sm font-semibold text-red-600 hover:underline hover:underline-offset-2"
        >
          <span>Forgot Password?</span>
        </div>

        <div className="text-center">
          <Button className="mb-4" onClick={handleLogin}>
            Log in
          </Button>
          <p className="text-sm font-medium text-gray-600">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="cursor-pointer text-red-600 hover:underline hover:underline-offset-2"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
