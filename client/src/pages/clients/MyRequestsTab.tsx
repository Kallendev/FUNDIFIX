// src/pages/clients/MyRequestsTab.tsx
import { useEffect, useState } from "react";
import api from "@/api/axios"; // your configured axios instance

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Job {
  _id: string;
  title: string;
  category: string;
  budget: number;
  location: string;
  status: string;
  createdAt?: string;
}

const MyRequestsTab = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // NEW endpoint that uses the token to identify the client
        const res = await api.get("/jobs/client/my-jobs");
        // controller returns { jobs: [...] }
        setJobs(res.data?.jobs || []);
      } catch (err) {
        console.error("❌ Failed to fetch jobs:", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 text-white bg-[#0e1320]">
      <h2 className="text-3xl font-bold text-orange-400 mb-6">📄 My Job Requests</h2>

      {loading ? (
        <p className="text-gray-400">Loading your jobs...</p>
      ) : jobs.length === 0 ? (
        <div className="space-y-4 text-center py-12">
          <p className="text-[#7DF9FF] text-lg font-medium">No jobs posted yet.</p>
          <p className="text-gray-400">Click “Post a Job” to get fundis working for you. ✨</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card
              key={job._id}
              className="bg-gradient-to-br from-[#1a1f36] to-[#0d1117] border border-[#2b2f4a] hover:border-orange-400 transition duration-300 shadow-lg hover:shadow-orange-500/10"
            >
              <CardHeader>
                <CardTitle className="text-[#7DF9FF] text-xl font-semibold">
                  {job.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-300">
                <p>📍 <span className="font-medium text-white">{job.location}</span></p>
                <p>🛠 <span className="font-medium text-white">{job.category}</span></p>
                <p>💰 <span className="font-medium text-white">KES {Number(job.budget).toLocaleString()}</span></p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      job.status === "open"
                        ? "text-green-400"
                        : job.status === "closed"
                        ? "text-red-400"
                        : "text-orange-400"
                    }`}
                  >
                    {job.status}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequestsTab;
