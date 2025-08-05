import { useEffect, useState } from 'react';
import axios from '@/api/axios';

import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Job = {
  _id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  location?: string;
  status?: string;
};

const JobPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const stored = localStorage.getItem('timenode_auth');
      const token = stored ? JSON.parse(stored).token : null;

      if (!token) {
        setError('🔒 Unauthorized. Please log in.');
        return;
      }

      const res = await axios.get('/jobs'); // Axios instance attaches token
      setJobs(res.data.jobs || []);
      setError('');
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 401) {
        setError('🔒 Session expired or unauthorized. Please log in again.');
      } else {
        setError('⚠️ Failed to load jobs. Please check your network or try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const formatBudget = (amount: number) =>
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Available Jobs 🧰</h1>
      <p className="mb-6 text-gray-600">
        Browse through all the jobs posted by clients. Fundis can view job descriptions and apply for jobs that match their skills.
      </p>

      {loading && (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4 flex items-center justify-between">
          <span>{error}</span>
          <Button onClick={fetchJobs} className="ml-4">
            Retry
          </Button>
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="text-center py-10 text-gray-500 text-lg">
          😴 No jobs posted yet. Check back later or refresh!
        </div>
      )}

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border p-6 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-1">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <Badge variant="outline" className="text-sm capitalize">
                {job.category}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-2">
              📍 Location: {job.location || 'Unknown'}
            </p>

            <p className="text-gray-700">{job.description}</p>

            <div className="mt-3 flex justify-between items-center">
              <span className="text-blue-600 font-medium">
                💰 Budget: {formatBudget(job.budget)}
              </span>

              {job.status && (
                <Badge
                  className={`${
                    job.status === 'open'
                      ? 'bg-green-100 text-green-700'
                      : job.status === 'assigned'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-600'
                  } text-xs`}
                >
                  {job.status}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPage;
