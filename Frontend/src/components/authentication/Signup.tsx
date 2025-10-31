// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Mail,
//   Eye,
//   EyeOff,
//   ChevronLeft,
//   LockKeyhole,
//   Github,
//   Loader2,
// } from 'lucide-react';
// import Input from '../ui/Input';
// import Button from '../ui/Button';
// import { useToast } from '@/hooks/useToast';
// import { useCrud } from '@/hooks/useCrud';
// import { usePasswordToggle } from '@/hooks/usePasswordToggle';
// import { checkPasswordMatch } from '@/utils/CheckPasswordMatch';
// import { validateEmail } from '@/utils/ValidateEmail';
// import { useEnterKey } from '@/hooks/useEnterKey';

// interface NewUser {
//   id: number;
//   email: string;
//   password: string;
// }

// // NOTE: import.meta.env is not supported in this environment, using a mock constant.
// const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// const Signup = () => {
//   const navigate = useNavigate();
//   const { showToast } = useToast();

//   // Initialize the Crud hook for the 'signup' endpoint
//   const { createItem, loading: signupLoading } = useCrud<NewUser>(
//     `${API_BASE_URL}/auth/signup/`,
//   );

//   const passwordToggle = usePasswordToggle();
//   const confirmToggle = usePasswordToggle();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordConfirm, setPasswordConfirm] = useState('');
//   const [socialLoading, setSocialLoading] = useState<string | null>(null);

//   // Initial form validation ---
//   const isFormIncomplete = !email || !password || !passwordConfirm;

//   // --- SOCIAL SIGNUP HANDLERS ---
//   const handleSocialSignup = (provider: 'google' | 'github') => {
//     setSocialLoading(provider);
//     const endpoint = `${API_BASE_URL}/auth/${provider}/`;

//     showToast(`Redirecting to ${provider} to authorize sign-up...`, 'info');
//     window.location.href = endpoint;
//   };

//   const handleGoogleSignup = () => handleSocialSignup('google');
//   const handleGithubSignup = () => handleSocialSignup('github');

//   // --- EMAIL/PASSWORD SIGNUP HANDLER ---
//   const handleSignup = async () => {
//     // Client-side Validation ---
//     if (!checkPasswordMatch(password, passwordConfirm, showToast)) return;

//     if (!validateEmail(email) && password) {
//       showToast('Please enter a valid email address', 'info');
//       return;
//     }

//     // Prepare Data and Call the Hook ---
//     const userData: Omit<NewUser, 'id'> = { email, password };

//     // proceed with API call
//     try {
//       // The hook handles the POST request
//       const response = await createItem(userData);

//       // Success Handling ---
//       console.log('Signup success response:', response);
//       showToast('Signup successful! Welcome to Swapo!', 'success');

//       // Redirect to onboarding home
//       navigate('/onboarding');
//     } catch (error) {
//       // Error Handling ---
//       const errorMessage =
//         (error as Error).message || 'Signup failed. Please try again.';
//       showToast(errorMessage, 'error');
//     }
//   };

//   //  Trigger signup on Enter key
//   useEnterKey(handleSignup);

//   // Google Logo SVG for the button icon
//   const GoogleLogo = (
//     <svg
//       version="1.1"
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 48 48"
//       className="h-5 w-5"
//     >
//       <path
//         fill="#4285F4"
//         d="M44.5 20H24v8.5h11.8c-.8 4.7-4 7.5-8.5 7.5-6 0-10.8-4.8-10.8-10.8s4.8-10.8 10.8-10.8c3.2 0 5.6 1.3 7 2.7l6.6-6.6c-4.4-4-10.1-6.5-16.1-6.5-12 0-21.7 9.7-21.7 21.7s9.7 21.7 21.7 21.7c11.6 0 21.2-8.4 21.2-20.4 0-1.4-.2-2.7-.4-4z"
//       ></path>
//       <path
//         fill="#34A853"
//         d="M37.5 44.2c-2.3.9-4.8 1.4-7.3 1.4-12 0-21.7-9.7-21.7-21.7 0-1.2.1-2.4.4-3.5h7.2v3.8h-4.6c-.3 1.1-.5 2.2-.5 3.4 0 9.8 8 17.8 17.8 17.8 4.9 0 9.2-2 12.3-5.2l-4.7-3.7z"
//       ></path>
//       <path
//         fill="#FBBC05"
//         d="M8.2 27c-.2-1-.3-2.1-.3-3.2s.1-2.2.3-3.2v-3.8h-7.2c-.3 1.1-.4 2.4-.4 3.8s.1 2.7.4 3.8l7.2 3.2z"
//       ></path>
//       <path
//         fill="#EA4335"
//         d="M21.7 8.1c3 0 5.6 1.1 7.7 2.9l6.2-6.2c-3.6-3.3-8.3-5.4-13.9-5.4-12 0-21.7 9.7-21.7 21.7 0 1.4.2 2.7.4 4l7.2-3.2c-.2-1.1-.4-2.2-.4-3.4 0-4.9 2-9.2 5.2-12.3z"
//       ></path>
//     </svg>
//   );

//   return (
//     <div className="mx-auto min-h-screen max-w-lg bg-white px-4 py-8">
//       <div title="back">
//         <ChevronLeft
//           size={28}
//           className="cursor-pointer text-gray-700 transition hover:text-red-600"
//           onClick={() => navigate(-1)}
//         />
//       </div>

//       <div className="mt-14 flex flex-col text-center">
//         <div>
//           <h1 className="text-3xl font-extrabold text-gray-900">Join Swapo</h1>
//           <p className="text-md mt-2 text-gray-500">
//             Start your 30-day free trial now.
//           </p>
//         </div>

//         {/* --- SOCIAL SIGNUP BUTTONS --- */}
//         <div className="my-10 flex flex-col space-y-3">
//           <Button
//             onClick={handleGoogleSignup}
//             variant="outline"
//             className="w-full border border-gray-300 bg-white text-gray-700 transition duration-150 hover:bg-gray-50"
//             disabled={socialLoading !== null}
//           >
//             {socialLoading === 'google' ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               <span className="mr-2">{GoogleLogo}</span>
//             )}
//             Sign up with Google
//           </Button>

//           <Button
//             onClick={handleGithubSignup}
//             variant="outline"
//             className="w-full border border-gray-300 bg-white text-gray-700 transition duration-150 hover:bg-gray-50"
//             disabled={socialLoading !== null}
//           >
//             {socialLoading === 'github' ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               <Github className="mr-2 h-5 w-5" />
//             )}
//             Sign up with GitHub
//           </Button>
//         </div>

//         {/* --- OR SEPARATOR --- */}
//         <div className="my-2 flex items-center justify-center space-x-2">
//           <div className="h-px flex-grow bg-gray-300"></div>
//           <span className="text-sm font-medium text-gray-500">OR</span>
//           <div className="h-px flex-grow bg-gray-300"></div>
//         </div>

//         {/* --- EMAIL/PASSWORD FORM --- */}
//         <div className="my-6 flex flex-col space-y-6">
//           {/* Email */}
//           <Input
//             icon={<Mail size={18} />}
//             placeholderText="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={signupLoading || socialLoading !== null}
//           />

//           {/* Password */}
//           <Input
//             icon={<LockKeyhole size={18} />}
//             placeholderText="Password"
//             type={passwordToggle.inputType}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             disabled={signupLoading || socialLoading !== null}
//             rightIcon={
//               passwordToggle.visible ? (
//                 <EyeOff
//                   size={18}
//                   className="cursor-pointer text-gray-500"
//                   onClick={passwordToggle.toggleVisibility}
//                 />
//               ) : (
//                 <Eye
//                   size={18}
//                   className="cursor-pointer text-gray-500"
//                   onClick={passwordToggle.toggleVisibility}
//                 />
//               )
//             }
//           />

//           {/* Confirm Password */}
//           <Input
//             icon={<LockKeyhole size={18} />}
//             placeholderText="Confirm password"
//             type={confirmToggle.inputType}
//             value={passwordConfirm}
//             onChange={(e) => setPasswordConfirm(e.target.value)}
//             disabled={signupLoading || socialLoading !== null}
//             rightIcon={
//               confirmToggle.visible ? (
//                 <EyeOff
//                   size={18}
//                   className="cursor-pointer text-gray-500"
//                   onClick={confirmToggle.toggleVisibility}
//                 />
//               ) : (
//                 <Eye
//                   size={18}
//                   className="cursor-pointer text-gray-500"
//                   onClick={confirmToggle.toggleVisibility}
//                 />
//               )
//             }
//           />
//         </div>

//         <div className="text-center">
//           <Button
//             className="mb-4"
//             onClick={handleSignup}
//             disabled={
//               signupLoading || isFormIncomplete || socialLoading !== null
//             }
//           >
//             {signupLoading ? 'Signing up...' : 'Create Account'}
//           </Button>
//           <p className="text-sm font-medium text-gray-600">
//             Already have an account?{' '}
//             <span
//               onClick={() => navigate('/login')}
//               className="cursor-pointer font-semibold text-red-600 hover:underline hover:underline-offset-2"
//             >
//               Log in
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;




import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Eye, EyeOff, ChevronLeft, LockKeyhole, Github, Loader2 } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useToast } from '@/hooks/useToast';
import { useCrud } from '@/hooks/useCrud';
import { usePasswordToggle } from '@/hooks/usePasswordToggle';
import { checkPasswordMatch } from '@/utils/CheckPasswordMatch';
import { validateEmail } from '@/utils/ValidateEmail';
import { useEnterKey } from '@/hooks/useEnterKey';
import { useAuth } from '@/context/AuthContext'; // ✅ added

interface NewUser {
  id?: number;
  email: string;
  password: string;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth(); // ✅ from context

  const { createItem, loading: signupLoading } = useCrud<NewUser>(
    `${API_BASE_URL}/auth/signup/`
  );

  const passwordToggle = usePasswordToggle();
  const confirmToggle = usePasswordToggle();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const isFormIncomplete = !email || !password || !passwordConfirm;

  const handleSocialSignup = (provider: 'google' | 'github') => {
    setSocialLoading(provider);
    const endpoint = `${API_BASE_URL}/auth/${provider}/`;
    showToast(`Redirecting to ${provider}...`, 'info');
    window.location.href = endpoint;
  };

  const handleSignup = async () => {
    if (!checkPasswordMatch(password, passwordConfirm, showToast)) return;
    if (!validateEmail(email)) {
      showToast('Please enter a valid email address', 'info');
      return;
    }

    try {
      const response = await createItem({ email, password });
      console.log('Signup success:', response);

      const token = response.access || response.token;
      const user = response.user || response || {};

      if (token) {
        login(token, user); // ✅ Log user in directly after signup
        showToast('Signup successful! Welcome!', 'success');
        navigate('/onboarding');
      } else {
        showToast('Signup successful! Please log in.', 'success');
        navigate('/login');
      }
    } catch (error) {
      showToast('Signup failed. Please try again.', 'error');
    }
  };

  useEnterKey(handleSignup);

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-white px-4 py-8">
      <ChevronLeft
        size={28}
        className="cursor-pointer text-gray-700 hover:text-red-600"
        onClick={() => navigate(-1)}
      />

      <div className="mt-14 flex flex-col text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Join Swapo</h1>
        <p className="mt-2 text-gray-500">Start your 30-day free trial now.</p>

        <div className="my-10 flex flex-col space-y-3">
          <Button
            onClick={() => handleSocialSignup('google')}
            variant="outline"
            disabled={socialLoading !== null}
            className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            {socialLoading === 'google' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Sign up with Google'
            )}
          </Button>

          <Button
            onClick={() => handleSocialSignup('github')}
            variant="outline"
            disabled={socialLoading !== null}
            className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            {socialLoading === 'github' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Github className="mr-2 h-5 w-5" />
            )}
            Sign up with GitHub
          </Button>
        </div>

        <div className="my-2 flex items-center justify-center space-x-2">
          <div className="h-px flex-grow bg-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-grow bg-gray-300" />
        </div>

        <div className="my-6 flex flex-col space-y-6">
          <Input
            icon={<Mail size={18} />}
            placeholderText="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={<LockKeyhole size={18} />}
            placeholderText="Password"
            type={passwordToggle.inputType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              passwordToggle.visible ? (
                <EyeOff size={18} onClick={passwordToggle.toggleVisibility} className="cursor-pointer text-gray-500" />
              ) : (
                <Eye size={18} onClick={passwordToggle.toggleVisibility} className="cursor-pointer text-gray-500" />
              )
            }
          />
          <Input
            icon={<LockKeyhole size={18} />}
            placeholderText="Confirm password"
            type={confirmToggle.inputType}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            rightIcon={
              confirmToggle.visible ? (
                <EyeOff size={18} onClick={confirmToggle.toggleVisibility} className="cursor-pointer text-gray-500" />
              ) : (
                <Eye size={18} onClick={confirmToggle.toggleVisibility} className="cursor-pointer text-gray-500" />
              )
            }
          />
        </div>

        <div className="text-center">
          <Button
            onClick={handleSignup}
            disabled={signupLoading || isFormIncomplete || socialLoading !== null}
          >
            {signupLoading ? 'Signing up...' : 'Create Account'}
          </Button>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="cursor-pointer text-red-600 hover:underline"
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
