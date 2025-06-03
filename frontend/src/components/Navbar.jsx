import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
    window.location.href = '/';
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <span className="text-lg font-semibold">Xeno CRM</span>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
