import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const FundiDashboard = () => {
  const nav = useNavigate();
  const [fundiName, setFundiName] = useState("Fundi");
  const [profileImage, setProfileImage] = useState(null);
  const [jobsCompleted, setJobsCompleted] = useState(0);
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState("Available Now");

  useEffect(() => {
    // Example: fetching from localStorage or API
    const storedName = localStorage.getItem("fundiName");
    const storedImage = localStorage.getItem("fundiImage");
    const storedJobs = localStorage.getItem("jobsCompleted");
    const storedRating = localStorage.getItem("fundiRating");
    const storedAvailability = localStorage.getItem("fundiAvailability");

    if (storedName) setFundiName(storedName);
    if (storedImage) setProfileImage(storedImage);
    if (storedJobs) setJobsCompleted(parseInt(storedJobs));
    if (storedRating) setRating(parseFloat(storedRating));
    if (storedAvailability) setAvailability(storedAvailability);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  const toggleAvailability = () => {
    const newStatus =
      availability === "Available Now" ? "Unavailable" : "Available Now";
    setAvailability(newStatus);
    localStorage.setItem("fundiAvailability", newStatus);
  };

  return (
    <div className="min-h-screen bg-[#121212] py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-orange-400 object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full border-2 border-orange-400 bg-gray-500 flex items-center justify-center text-lg font-bold">
                {fundiName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-extrabold">Welcome, {fundiName}</h1>
              <div className="flex gap-6 mt-1 text-sm text-gray-300">
                <span>⭐ {rating.toFixed(1)} / 5</span>
                <span>📌 {jobsCompleted} Jobs Completed</span>
                <span className="cursor-pointer" onClick={toggleAvailability}>
                  🟢 {availability}
                </span>
              </div>
            </div>
          </div>
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
          {/* My Jobs (Active) */}
          <Card className="bg-[#1E1E1E] text-white hover:shadow-xl transition duration-300">
            <CardHeader>
              <CardTitle className="text-orange-400">🔧 My Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and manage your current jobs.</p>
              <Button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => nav("/fundi/active-jobs")}
              >
                View Active Jobs
              </Button>
            </CardContent>
          </Card>

          {/* Completed Jobs */}
          <Card className="bg-[#1E1E1E] text-white hover:shadow-xl transition duration-300">
            <CardHeader>
              <CardTitle className="text-orange-400">✅ Completed Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>See all jobs you’ve successfully finished.</p>
              <Button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => nav("/fundi/completed-jobs")}
              >
                View Completed Jobs
              </Button>
            </CardContent>
          </Card>

          {/* Job Applications */}
          <Card className="bg-[#1E1E1E] text-white hover:shadow-xl transition duration-300">
            <CardHeader>
              <CardTitle className="text-orange-400">📄 My Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Track your job applications and statuses.</p>
              <Button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => nav("/fundi/applications")}
              >
                View Applications
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
