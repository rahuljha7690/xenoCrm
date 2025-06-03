import { useState } from 'react';
import axios from '../api/axios';

const PromptToRule = () => {
  const [prompt, setPrompt] = useState('');
  const [rules, setRules] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/ai/segment-rules', { prompt });
      setRules(res.data.rules);
    } catch (err) {
      setError('❌ Failed to generate rules');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">🧠 AI Rule Generator</h2>

      <textarea
        className="w-full h-32 p-2 border rounded mb-4"
        placeholder='e.g., People who spent more than ₹10,000 and visited less than 3 times in the last 90 days'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Rules'}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {rules && (
        <div className="mt-4 p-3 border rounded bg-gray-50 whitespace-pre-wrap">
          <h4 className="font-semibold mb-2">Generated Rules:</h4>
          <code>{rules}</code>
        </div>
      )}
    </div>
  );
};

export default PromptToRule;
