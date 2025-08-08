import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Wallet } from "lucide-react";

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
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/jobs");
      setJobs(res.data.jobs || []);
      setError("");
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.status === 401
          ? "🔒 Session expired or unauthorized. Please log in again."
          : "⚠️ Failed to load jobs. Please check your network or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const formatBudget = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-700 text-green-200";
      case "assigned":
        return "bg-orange-400 text-white"; // your orange-600
      case "closed":
        return "bg-gray-700 text-gray-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-[#0e1320] min-h-screen text-white rounded-lg">
      <h1 className="text-3xl font-bold mb-2 text-orange-400">Available Jobs 🧰</h1>
      <p className="mb-6 text-gray-300">
        Browse through all the jobs posted by clients. Fundis can view job descriptions and apply for jobs that match their skills.
      </p>

      {/* Loading State */}
      {loading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-xl bg-[#1a1f36] shadow-md animate-pulse">
              <Skeleton className="h-6 w-3/4 mb-4 bg-electricblue" />
              <Skeleton className="h-4 w-1/2 mb-2 bg-electricblue" />
              <Skeleton className="h-4 w-full mb-2 bg-electricblue" />
              <Skeleton className="h-4 w-2/3 bg-electricblue" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-800 text-red-300 p-4 rounded-lg mb-4 flex items-center justify-between">
          <span>{error}</span>
          <Button onClick={fetchJobs} variant="outline" size="sm" className="border-orange-400 text-orange-600 hover:bg-orange-600 hover:text-white">
            Retry
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && jobs.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <p className="text-lg">😴 No jobs posted yet.</p>
          <p className="text-sm">Check back later or refresh the page.</p>
          <Button onClick={fetchJobs} className="mt-4 bg-orange-400 hover:bg-orange-700 text-white">
            Refresh Jobs
          </Button>
        </div>
      )}

      {/* Jobs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="p-6 rounded-xl bg-[#1a1f36] border border-[#2b2f4a] shadow-md hover:shadow-electricblue hover:border-electricblue transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold text-white">{job.title}</h2>
              <Badge
                variant="outline"
                className="capitalize border-orange-400 text-orange-400"
              >
                {job.category}
              </Badge>
            </div>

            <div className="flex items-center text-sm text-gray-400 mb-2">
              <MapPin size={16} className="mr-1 text-electricblue" />
              {job.location || "Unknown"}
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-3">{job.description}</p>

            <div className="flex justify-between items-center">
              <span className="text-electricblue font-semibold flex items-center">
                <Wallet size={16} className="mr-1" />
                {formatBudget(job.budget)}
              </span>

              {job.status && (
                <Badge
                  className={`${getStatusStyles(job.status)} text-xs capitalize font-medium`}
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
