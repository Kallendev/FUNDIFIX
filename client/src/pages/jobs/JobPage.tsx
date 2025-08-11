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
  applicants?: string[]; // list of fundi IDs who applied (optional)
};

const JobPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applyingForJobId, setApplyingForJobId] = useState<string | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set()); // track locally applied jobs

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

  // Format currency for Kenyan Shilling
  const formatBudget = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);

  // Status badge styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "open":
        return "bg-[#00F0FF] text-black";
      case "assigned":
        return "bg-orange-400 text-white"; // your orange-400
      case "closed":
        return "bg-gray-700 text-gray-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  // Handle applying for a job
  const handleApply = async (jobId: string) => {
    try {
      setApplyingForJobId(jobId);
      // Example API: POST /jobs/:jobId/apply
      // Assuming backend needs token automatically via axios instance or you add headers here
      await axios.post(`/jobs/${jobId}/apply`);

      // Mark job as applied locally
      setAppliedJobs((prev) => new Set(prev).add(jobId));

      alert("✅ Applied successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to apply. Please try again.");
    } finally {
      setApplyingForJobId(null);
    }
  };

  return (
    <div
      className="p-6 max-w-5xl mx-auto bg-[#0e1320] min-h-screen text-white rounded-lg"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="text-3xl font-bold mb-2 text-orange-400">Available Jobs 🧰</h1>
      <p className="mb-6 text-gray-300">
        Browse through all the jobs posted by clients. Fundis can view job descriptions and apply for jobs that match their skills.
      </p>

      {/* Loading */}
      {loading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-[#1a1f36] shadow-md animate-pulse"
            >
              <Skeleton className="h-6 w-3/4 mb-4 bg-electricblue" />
              <Skeleton className="h-4 w-1/2 mb-2 bg-electricblue" />
              <Skeleton className="h-4 w-full mb-2 bg-electricblue" />
              <Skeleton className="h-4 w-2/3 bg-electricblue" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-800 text-red-300 p-4 rounded-lg mb-4 flex items-center justify-between">
          <span>{error}</span>
          <Button
            onClick={fetchJobs}
            variant="outline"
            size="sm"
            className="border-orange-400 text-orange-600 hover:bg-orange-600 hover:text-white"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && jobs.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <p className="text-lg">😴 No jobs posted yet.</p>
          <p className="text-sm">Check back later or refresh the page.</p>
          <Button
            onClick={fetchJobs}
            className="mt-4 bg-orange-400 hover:bg-orange-700 text-white"
          >
            Refresh Jobs
          </Button>
        </div>
      )}

      {/* Jobs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => {
          const isApplied = appliedJobs.has(job._id) || job.applicants?.includes?.(/* fundi ID here? */"");

          return (
            <div
              key={job._id}
              className="p-6 rounded-xl bg-[#1a1f36] border border-[#2b2f4a] shadow-md hover:shadow-electricblue hover:border-electricblue transition-all duration-200 flex flex-col justify-between"
            >
              <div>
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

                <div className="flex justify-between items-center mb-4">
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

              <Button
                disabled={isApplied || job.status !== "open" || applyingForJobId === job._id}
                onClick={() => handleApply(job._id)}
                className={`w-full rounded-full font-semibold transition ${
                  isApplied
                    ? "bg-gray-600 cursor-not-allowed text-gray-400"
                    : "bg-orange-400 hover:bg-orange-500 text-black"
                }`}
              >
                {applyingForJobId === job._id
                  ? "Applying..."
                  : isApplied
                  ? "Already Applied"
                  : "Apply"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobPage;
