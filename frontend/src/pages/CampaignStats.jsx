import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

const CampaignStats = () => {
  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      const res = await axios.get(`/campaigns/${id}/stats`);
      setStats(res.data);
    } catch (err) {
      setError('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">📊 Campaign Delivery Stats</h2>

      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Total Audience:</strong> {stats.audienceSize}</li>
        <li><strong>Delivered:</strong> ✅ {stats.sent}</li>
        <li><strong>Failed:</strong> ❌ {stats.failed}</li>
      </ul>
    </div>
  );
};

export default CampaignStats;
