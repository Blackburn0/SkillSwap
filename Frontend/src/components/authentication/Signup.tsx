import { useNavigate } from 'react-router-dom';
import { Mail, Eye, EyeOff, ChevronLeft, LockKeyhole } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { usePasswordToggle } from '@/hooks/usePasswordToggle';
import { checkPasswordMatch } from '@/utils/CheckPasswordMatch';
import { useToast } from '@/hooks/useToast';
import { useState } from 'react';
import { validateEmail } from '@/utils/ValidateEmail';
import { useEnterKey } from '@/hooks/useEnterKey';

const Signup = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const passwordToggle = usePasswordToggle();
  const confirmToggle = usePasswordToggle();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSignup = () => {
    if (!checkPasswordMatch(password, passwordConfirm, showToast)) return;

    if (!validateEmail(email) && password) {
      showToast('Please enter a valid email address', 'info');
      return;
    }

    showToast('Demo signup successful', 'success');

    // proceed with API call
  };

  //  Trigger signup on Enter key
  useEnterKey(handleSignup);

  return (
    <div className="mx-auto min-h-screen max-w-md px-4 py-8">
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
            Create your account
          </h1>
          <p className="mt-2 text-gray-600">
            Let's get started with your 30-day free trial
          </p>
        </div>

        <div className="my-10 flex flex-col space-y-6">
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

          {/* Confirm Password */}
          <Input
            icon={<LockKeyhole size={18} />}
            placeholderText="Confirm password"
            type={confirmToggle.inputType}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            rightIcon={
              confirmToggle.visible ? (
                <EyeOff
                  size={18}
                  className="cursor-pointer text-gray-500"
                  onClick={confirmToggle.toggleVisibility}
                />
              ) : (
                <Eye
                  size={18}
                  className="cursor-pointer text-gray-500"
                  onClick={confirmToggle.toggleVisibility}
                />
              )
            }
          />
        </div>

        <div className="text-center">
          <Button className="mb-4" onClick={handleSignup}>
            Create Account
          </Button>
          <p className="text-sm font-medium text-gray-600">
            Already have an account?{' '}
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

export default Signup;
