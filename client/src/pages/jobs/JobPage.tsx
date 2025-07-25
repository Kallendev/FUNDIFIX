import { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs'); // 🔁 Update if your endpoint is different
        setJobs(res.data.jobs || []);
      } catch (err: any) {
        setError('Failed to load jobs. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Available Jobs 🧰</h1>
      <p className="mb-6 text-gray-600">
        Browse through all the jobs posted by clients. Fundis can view job descriptions and apply for jobs that match their skills.
      </p>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-500 bg-red-100 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="text-gray-500 text-center py-6">No jobs posted yet 🚧</div>
      )}

      <div className="space-y-6">
        {jobs.map((job: any) => (
          <div key={job._id} className="border p-6 rounded-xl shadow-sm bg-white">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <Badge variant="outline" className="text-sm">{job.category}</Badge>
            </div>
            <p className="text-sm text-gray-500">Location: {job.location || 'Unknown'}</p>
            <p className="text-gray-700 mt-3">{job.description}</p>
            <p className="text-blue-600 mt-2 font-medium">Budget: Ksh {job.budget}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPage;
