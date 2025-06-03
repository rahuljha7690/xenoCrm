import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get('/campaigns');
      setCampaigns(res.data);
    } catch (err) {
      setError('Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Campaign History</h2>

      {loading && <p>Loading campaigns...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && campaigns.length === 0 && (
        <p className="text-gray-600">No campaigns yet. <Link to="/campaigns/new" className="text-blue-600 underline">Create one?</Link></p>
      )}

      <table className="w-full border text-left mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Audience</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Stats</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c._id} className="hover:bg-gray-50">
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.audienceSize}</td>
              <td className="p-2 border">{new Date(c.createdAt).toLocaleString()}</td>
              <td className="p-2 border">
                <Link
                  to={`/campaigns/${c._id}/stats`}
                  className="text-blue-600 underline"
                >
                  View Stats
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Campaigns;
