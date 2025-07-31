import React, { useState } from 'react';
import axios from 'axios';

const PostJobPage = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('../api/jobs', jobData); // adjust endpoint as needed
      setMessage('✅ Job posted successfully!');
      setJobData({ title: '', description: '', category: '', budget: '', location: '' });
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to post job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-[#7DF9FF] mb-4">🛠️ Post a New Job</h1>

        {message && <p className="mb-4 text-sm">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={jobData.title}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a1f36] border border-[#2b2f4a] rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={jobData.description}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a1f36] border border-[#2b2f4a] rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Plumbing, Electrical)"
            value={jobData.category}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a1f36] border border-[#2b2f4a] rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget in KES"
            value={jobData.budget}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a1f36] border border-[#2b2f4a] rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={jobData.location}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a1f36] border border-[#2b2f4a] rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors"
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;
