import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Job {
  _id: string;
  title: string;
  category: string;
  budget: number;
  location: string;
  status: string;
}

const MyRequestsTab = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`/api/jobs/client/${userId}`);
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    if (userId) fetchJobs();
  }, [userId]);

  return (
    <div className="min-h-screen px-4 py-6 text-white bg-[#0e1320]">
      <h2 className="text-2xl font-bold text-orange-400 mb-6">📄 My Job Requests</h2>

      {jobs.length === 0 ? (
        <p className="text-[#7DF9FF] text-lg font-medium">No jobs posted yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card
              key={job._id}
              className="bg-[#1a1f36] border border-[#2b2f4a] hover:border-orange-400 transition duration-300 shadow-md hover:shadow-orange-500/10"
            >
              <CardHeader>
                <CardTitle className="text-[#7DF9FF] text-xl font-semibold">
                  {job.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-300">
                <p>📍 <span className="font-medium text-white">{job.location}</span></p>
                <p>🛠 <span className="font-medium text-white">{job.category}</span></p>
                <p>💰 <span className="font-medium text-white">KES {job.budget}</span></p>
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
