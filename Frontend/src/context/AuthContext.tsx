import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Define the shape of the User and Context
const initialUserState = {
  isAuthenticated: false,
  user: null, // Full user object from API
  token: localStorage.getItem('authToken') || null,
};

interface User {
  [key: string]: any;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

interface AuthContextType extends AuthState {
  login: (token: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  ...initialUserState,
  login: (token: string, userData: User) => {},
  logout: () => {},
  loading: true,
});

// 2. The Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialUserState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load initial state from local storage on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userJson = localStorage.getItem('user');

    if (token && userJson) {
      try {
        setAuthState({
          isAuthenticated: true,
          token: token,
          user: JSON.parse(userJson),
        });
      } catch (e) {
        // Clear invalid data
        localStorage.clear();
        setAuthState(initialUserState);
      }
    }
    setLoading(false);
  }, []);

  // Function to call after a successful login API request (either token or social)
  interface LoginFn {
    (token: string, userData: User): void;
  }

  const login: LoginFn = (token: string, userData: User): void => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));

    setAuthState({
      isAuthenticated: true,
      token: token,
      user: userData,
    });
  };

  // Function to handle logout across the app
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
    });

    // Redirect to a public route
    navigate('/login');
  };

  const value = {
    ...authState,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render children until the initial auth check is done */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. The Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
