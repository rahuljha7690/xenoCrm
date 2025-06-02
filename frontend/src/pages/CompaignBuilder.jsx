import { useState } from 'react';
import axios from '../api/axios';

const FIELDS = ['totalSpend', 'visitCount', 'lastActive'];
const OPERATORS = ['>', '<', '>=', '<=', '==', '!='];

const CampaignBuilder = () => {
  const [logic, setLogic] = useState('AND');
  const [conditions, setConditions] = useState([
    { field: '', operator: '', value: '' }
  ]);
  const [campaignName, setCampaignName] = useState('');
  const [audienceSize, setAudienceSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const updateCondition = (index, key, val) => {
    const copy = [...conditions];
    copy[index][key] = val;
    setConditions(copy);
  };

  const addCondition = () => {
    setConditions([...conditions, { field: '', operator: '', value: '' }]);
  };

  const removeCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const previewAudience = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/campaigns/preview', { logic, conditions });
      setAudienceSize(res.data.count);
    } catch (err) {
      setMessage('Error fetching preview');
    } finally {
      setLoading(false);
    }
  };

  const saveCampaign = async () => {
    try {
      setLoading(true);
      await axios.post('/campaigns', {
        name: campaignName,
        rules: { logic, conditions }
      });
      setMessage('✅ Campaign created!');
      setTimeout(() => (window.location.href = '/campaigns'), 1000);
    } catch (err) {
      setMessage('❌ Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Campaign Builder</h2>

      <input
        className="w-full border p-2 rounded mb-4"
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
        placeholder="Campaign Name"
      />

      <div className="flex items-center gap-4 mb-4">
        <span className="font-medium">Logic:</span>
        <select value={logic} onChange={(e) => setLogic(e.target.value)} className="border p-1 rounded">
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>

      {conditions.map((cond, index) => (
        <div key={index} className="flex gap-3 mb-2">
          <select
            value={cond.field}
            onChange={(e) => updateCondition(index, 'field', e.target.value)}
            className="border p-1 rounded w-1/4"
          >
            <option value="">Field</option>
            {FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>

          <select
            value={cond.operator}
            onChange={(e) => updateCondition(index, 'operator', e.target.value)}
            className="border p-1 rounded w-1/4"
          >
            <option value="">Op</option>
            {OPERATORS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>

          <input
            type="text"
            value={cond.value}
            onChange={(e) => updateCondition(index, 'value', e.target.value)}
            className="border p-1 rounded w-1/3"
            placeholder="Value"
          />

          <button onClick={() => removeCondition(index)} className="text-red-500 font-bold">×</button>
        </div>
      ))}

      <button onClick={addCondition} className="text-blue-600 mt-2 mb-4">+ Add Condition</button>

      <div className="flex gap-4 mb-4">
        <button onClick={previewAudience} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          {loading ? 'Loading...' : 'Preview Audience'}
        </button>

        <button onClick={saveCampaign} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Campaign
        </button>
      </div>

      {audienceSize !== null && <p className="text-green-700">📊 Estimated audience: {audienceSize}</p>}
      {message && <p className="text-red-600 mt-2">{message}</p>}
    </div>
  );
};

export default CampaignBuilder;
