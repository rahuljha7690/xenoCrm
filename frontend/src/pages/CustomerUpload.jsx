import { useState } from 'react';
import axios from '../api/axios';

const CustomerUpload = () => {
  const [jsonText, setJsonText] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const handleUpload = async () => {
    try {
      const data = JSON.parse(jsonText);
      if (!Array.isArray(data)) throw new Error('Must be an array of customers');

      setLoading(true);
      await axios.post('/data/customers', data);
      setToast({ message: '✅ Customers uploaded successfully!', type: 'success' });
      setJsonText('');
    } catch (err) {
      setToast({ message: `❌ ${err.message}`, type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ message: '', type: '' }), 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-xl font-semibold mb-4">Upload Customer Data (JSON)</h1>

      <textarea
        className="w-full h-60 border border-gray-300 p-2 rounded mb-4 font-mono text-sm"
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        placeholder='Example: [{"name": "Rahul", "email": "rahul@example.com", "totalSpend": 5000}]'
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {toast.message && (
        <div className={`mt-4 text-sm ${toast.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default CustomerUpload;
