import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Campaigns from './pages/Campaigns.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import CustomerUpload from './pages/CustomerUpload.jsx';
import OrderUpload from './pages/OrderUpload.jsx';
import CampaignBuilder from './pages/CompaignBuilder.jsx';






function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/campaigns" element={<PrivateRoute><Campaigns /></PrivateRoute>} />
<Route path="/upload/customers" element={<PrivateRoute><CustomerUpload /></PrivateRoute>} />
<Route path="/campaigns/new" element={<PrivateRoute><CampaignBuilder /></PrivateRoute>} />

<Route path="/upload/orders" element={<PrivateRoute><OrderUpload /></PrivateRoute>} />


        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
