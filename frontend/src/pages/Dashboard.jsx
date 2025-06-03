import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">👋 Welcome, {user?.name || 'User'}!</h1>

      <div className="grid grid-cols-2 gap-4">
        <Link to="/upload/customers" className="p-4 bg-white shadow rounded hover:bg-blue-50">
          Upload Customers
        </Link>
        <Link to="/upload/orders" className="p-4 bg-white shadow rounded hover:bg-green-50">
          Upload Orders
        </Link>
        <Link to="/campaigns/new" className="p-4 bg-white shadow rounded hover:bg-purple-50">
          Build Campaign
        </Link>
        <Link to="/campaigns" className="p-4 bg-white shadow rounded hover:bg-gray-100">
          View Campaigns
        </Link>
        <Link to="/ai/rules" className="p-4 bg-white shadow rounded hover:bg-yellow-50">
          AI Rule Generator
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

