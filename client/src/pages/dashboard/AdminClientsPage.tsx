import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Phone, MessageCircle, Briefcase, Star, ArrowLeft, TrendingUp } from "lucide-react";

interface Client {
  _id: string;
  name: string;
  email: string;
  role: string;
  location?: string;
  profileImage?: string;
  phone?: string;
  jobsPosted?: number;
  successRate?: number;
  averageRating?: number;
  ratings?: any[];
}

interface JobBreakdown {
  [category: string]: number;
}

const AdminClientsPage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [jobBreakdown, setJobBreakdown] = useState<JobBreakdown>({});
  const [breakdownDialogOpen, setBreakdownDialogOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/clients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClients(res.data);
      } catch (err: any) {
        setError("Failed to fetch clients.");
        console.error("Error fetching clients", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const fetchJobBreakdown = async (clientId: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const clientJobs = res.data.jobs.filter(
        (job: any) => job.createdBy?._id === clientId || job.createdBy === clientId
      );

      const breakdown: JobBreakdown = {};
      clientJobs.forEach((job: any) => {
        if (job.category) {
          breakdown[job.category] = (breakdown[job.category] || 0) + 1;
        }
      });

      setJobBreakdown(breakdown);
    } catch (error) {
      console.error("Failed to fetch job breakdown:", error);
      setJobBreakdown({});
    }
  };

  const openBreakdownDialog = async (client: Client) => {
    setSelectedClient(client);
    setBreakdownDialogOpen(true);
    await fetchJobBreakdown(client._id);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-400";
    if (rating >= 3.5) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <div className="min-h-screen bg-[#0c0f1c] text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
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

        <h2 className="text-3xl font-bold text-orange-400 mb-2">Registered Clients 👥</h2>
        <p className="mb-6 text-gray-400">
          Manage client accounts, view their job posting history, and monitor success rates.
        </p>

        {loading ? (
          <p className="text-electric-blue animate-pulse">Loading clients...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <Card
                key={client._id}
                className="bg-[#1a1f36] border border-[#2b2f4a] hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="flex flex-col items-center">
                  <div
                    className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg mb-3"
                    style={{ border: "3px solid #00F0FF" }}
                  >
                    <img
                      src={client.profileImage || "https://via.placeholder.com/150"}
                      alt={`${client.name} profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg text-orange-300 text-center">{client.name}</CardTitle>
                </CardHeader>

                <CardContent className="text-sm text-gray-300 space-y-3">
                  <div className="flex items-center">
                    <span className="text-electric-blue font-medium mr-2">Email:</span>
                    <span className="truncate">{client.email}</span>
                  </div>

                  {client.location && (
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-electricblue" />
                      <span>{client.location}</span>
                    </div>
                  )}

                  {client.phone && (
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-electricblue" />
                      <a href={`tel:${client.phone}`} className="hover:text-electricblue">
                        {client.phone}
                      </a>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <div className="flex items-center">
                      <Briefcase size={16} className="mr-2 text-electricblue" />
                      <button
                        onClick={() => openBreakdownDialog(client)}
                        className="text-electricblue hover:underline font-medium"
                      >
                        {client.jobsPosted || 0} jobs posted
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp size={16} className="mr-2 text-green-400" />
                      <span className="text-gray-300">
                        Success: <span className="font-medium text-green-400">{client.successRate || 0}%</span>
                      </span>
                    </div>
                  </div>

                  {client.averageRating !== undefined && (
                    <div className="flex items-center">
                      <Star size={16} className="mr-2 text-yellow-400" fill="currentColor" />
                      <span className={getRatingColor(client.averageRating)}>
                        {client.averageRating.toFixed(1)} ({client.ratings?.length || 0})
                      </span>
                    </div>
                  )}

                  <Button
                    className="w-full mt-4 bg-electricblue hover:bg-blue-600 text-black font-bold rounded-full"
                    onClick={() => alert(`Chat feature coming soon for ${client.name}`)}
                  >
                    <MessageCircle className="mr-2" size={16} />
                    Chat
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={breakdownDialogOpen} onOpenChange={setBreakdownDialogOpen}>
          <DialogContent className="bg-[#1a1f36] text-white border-electricblue">
            <DialogHeader>
              <DialogTitle>{selectedClient?.name}'s Job Breakdown</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {Object.keys(jobBreakdown).length === 0 ? (
                <p className="text-gray-400">No jobs posted yet.</p>
              ) : (
                Object.entries(jobBreakdown).map(([category, count]) => (
                  <div
                    key={category}
                    className="flex justify-between items-center bg-[#0e1320] p-3 rounded-lg"
                  >
                    <span className="capitalize font-medium text-electricblue">{category}</span>
                    <span className="text-orange-400 font-bold">{count}</span>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminClientsPage;
