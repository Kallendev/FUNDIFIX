import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Wallet, ArrowLeft, Users } from "lucide-react";

type Job = {
  _id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  location?: string;
  status?: string;
  createdBy?: {
    _id: string;
    name: string;
  };
  applicants?: string[];
};

const AdminJobsPage = () => {
  const navigate = useNavigate();
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
      setError("Failed to load jobs. Please try again.");
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
        return "bg-[#00F0FF] text-black";
      case "assigned":
        return "bg-orange-400 text-white";
      case "completed":
        return "bg-green-600 text-white";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  return (
    <div
      className="p-6 max-w-7xl mx-auto bg-[#0e1320] min-h-screen text-white rounded-lg"
    >
      <div className="flex items-center mb-6">
        <Button
          onClick={() => navigate("/admin")}
          variant="ghost"
          className="mr-4 text-orange-400 hover:text-orange-300"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Dashboard
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-2 text-orange-400">Manage Jobs 🧰</h1>
      <p className="mb-6 text-gray-300">
        View all posted jobs, their applicants, and manage job assignments.
      </p>

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

      {!loading && !error && jobs.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <p className="text-lg">No jobs posted yet.</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
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

              {job.createdBy && (
                <div className="text-sm text-gray-300 mb-2">
                  <span className="text-electricblue font-medium">Client: </span>
                  {job.createdBy.name}
                </div>
              )}

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

              <div className="flex items-center text-sm text-gray-300 bg-[#0e1320] p-3 rounded-lg">
                <Users size={16} className="mr-2 text-electricblue" />
                <span className="font-medium">
                  {job.applicants?.length || 0} Applicant{job.applicants?.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminJobsPage;
