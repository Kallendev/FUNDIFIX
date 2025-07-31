import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ClientDashboard = () => {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div className="min-h-screen bg-[#0c0f1c] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">🙋 Client Dashboard</h1>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Requests */}
          <Card className="bg-[#1a1f36] text-white border border-[#2b2f4a] hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-orange-400">📄 My Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Track the jobs you've posted or requested.</p>
              <Button
                className="mt-4 bg-electricblue hover:bg-blue-700"
                onClick={() => nav("/client/requests")}
              >
                View Requests
              </Button>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="bg-[#1a1f36] text-white border border-[#2b2f4a] hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-orange-400">💬 Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Chat privately with fundis or admins.</p>
              <Button
                className="mt-4 bg-electricblue hover:bg-blue-700"
                onClick={() => nav("/client/messages")}
              >
                Open Chat
              </Button>
            </CardContent>
          </Card>

          {/* Payments */}
          <Card className="bg-[#1a1f36] text-white border border-[#2b2f4a] hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-orange-400">💰 Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Check your payment status and receipts.</p>
              <Button
                className="mt-4 bg-electricblue hover:bg-blue-700"
                onClick={() => nav("/client/payments")}
              >
                View Payments
              </Button>
            </CardContent>
          </Card>

          {/* Post a Job */}
          <Card className="bg-[#1a1f36] text-white border border-[#2b2f4a] hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-orange-400">📢 Post a Job</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Create a new job request and connect with available fundis.</p>
              <Button
                className="mt-4 bg-electricblue hover:bg-blue-700"
                onClick={() => nav("/client/post-job")}
              >
                Post a Job
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
