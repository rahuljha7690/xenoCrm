import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, checking } = useAuth();

  if (checking) return <div className="p-4">Loading...</div>;
  if (!user) return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
