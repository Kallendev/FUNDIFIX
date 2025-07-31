import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const FundiDashboard = () => {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div className="min-h-screen bg-[#121212] py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">👷 Fundi Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </Button>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Jobs */}
          <Card className="bg-[#1E1E1E] text-white hover:shadow-xl transition duration-300">
            <CardHeader>
              <CardTitle className="text-orange-400">🔧 My Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and manage your assigned jobs.</p>
              <Button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => nav("/fundi/jobs")}
              >
                View Jobs
              </Button>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card className="bg-[#1E1E1E] text-white hover:shadow-xl transition duration-300">
            <CardHeader>
              <CardTitle className="text-orange-400">📅 Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Check your upcoming work schedule.</p>
              <Button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => nav("/fundi/schedule")}
              >
                View Schedule
              </Button>
            </CardContent>
          </Card>

          {/* Earnings */}
          <Card className="bg-[#1E1E1E] text-white hover:shadow-xl transition duration-300">
            <CardHeader>
              <CardTitle className="text-orange-400">🧾 Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Track your payments and earnings.</p>
              <Button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => nav("/fundi/earnings")}
              >
                View Earnings
              </Button>
            </CardContent>
          </Card>

          {/* Profile */}
          <Card className="bg-[#1E1E1E] text-white hover:shadow-xl transition duration-300">
            <CardHeader>
              <CardTitle className="text-orange-400">👤 Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and edit your fundi profile.</p>
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => nav("/fundi/profile")}
              >
                Go to Profile
              </Button>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="bg-[#1E1E1E] text-white hover:shadow-xl transition duration-300">
            <CardHeader>
              <CardTitle className="text-orange-400">📩 Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Chat with clients and admins.</p>
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => nav("/fundi/messages")}
              >
                Open Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FundiDashboard;
