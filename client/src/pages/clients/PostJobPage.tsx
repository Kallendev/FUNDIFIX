import React, { useState } from 'react';
import { createJob } from '@/api/jobs';




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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await createJob(jobData); // ✅ token handled by axios interceptor
      setMessage('✅ Job posted successfully!');
      setJobData({ title: '', description: '', category: '', budget: '', location: '' });
    } catch (error: any) {
      console.error(error);
      setMessage(error?.message || '❌ Failed to post job.');
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

          <select
            name="category"
            value={jobData.category}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a1f36] border border-[#2b2f4a] rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Carpentry">Carpentry</option>
            <option value="Painting">Painting</option>
            <option value="Masonry">Masonry</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Landscaping">Landscaping</option>
            <option value="Mechanic">Mechanic</option>
          </select>

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
            id="location"
            name="location"
            placeholder="Type or select location"
            value={jobData.location}
            onChange={handleChange}
            list="location-options"
            className="w-full p-3 bg-[#1a1f36] border border-[#2b2f4a] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <datalist id="location-options">
            <option value="Nairobi" />
            <option value="Mombasa" />
            <option value="Kisumu" />
            <option value="Nakuru" />
            <option value="Eldoret" />
            <option value="Thika" />
            <option value="Machakos" />
            <option value="Meru" />
          </datalist>

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
