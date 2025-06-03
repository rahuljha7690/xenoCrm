// Login.jsx
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { user, checking } = useAuth();

  useEffect(() => {
    if (!checking && user) {
      window.location.href = '/dashboard';
    }
  }, [checking, user]);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  if (checking) {
    return <div className="h-screen flex items-center justify-center">Checking authentication...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Xeno CRM</h1>
        <p className="mb-6 text-gray-600">Your personalized campaign automation tool</p>

        <button
          onClick={handleGoogleLogin}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
