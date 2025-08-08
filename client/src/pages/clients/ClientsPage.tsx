import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Client {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token"); // Adjust if you store token elsewhere

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

  return (
    <div className="min-h-screen bg-[#0c0f1c] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-400 mb-6">👥 Registered Clients</h2>

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
                <CardHeader>
                  <CardTitle className="text-lg text-orange-300">{client.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-300">
                  <p>
                    <span className="text-electric-blue font-medium">Email:</span> {client.email}
                  </p>
                  <p>
                    <span className="text-electric-blue font-medium">Role:</span> {client.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;
