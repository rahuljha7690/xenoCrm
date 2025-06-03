import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CustomerUpload from './pages/CustomerUpload';
import OrderUpload from './pages/OrderUpload';
import CampaignBuilder from './pages/CompaignBuilder';
import Campaigns from './pages/Campaigns';
import CampaignStats from './pages/CampaignStats';
import PromptToRule from './pages/PromptToRule';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/upload/customers" element={<PrivateRoute><CustomerUpload /></PrivateRoute>} />
          <Route path="/upload/orders" element={<PrivateRoute><OrderUpload /></PrivateRoute>} />
          <Route path="/campaigns/new" element={<PrivateRoute><CampaignBuilder /></PrivateRoute>} />
          <Route path="/campaigns" element={<PrivateRoute><Campaigns /></PrivateRoute>} />
          <Route path="/campaigns/:id/stats" element={<PrivateRoute><CampaignStats /></PrivateRoute>} />
          <Route path="/ai/rules" element={<PrivateRoute><PromptToRule /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
