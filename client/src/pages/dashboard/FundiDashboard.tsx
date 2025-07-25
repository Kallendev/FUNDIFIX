
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const FundiDashboard = () => {
  const nav = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    nav("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">👷 Fundi Dashboard</h1>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition duration-300">
            <CardHeader>
              <CardTitle>🔧 My Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and manage your assigned jobs.</p>
              <Button className="mt-4" onClick={() => nav("/fundi/jobs")}>
                View Jobs
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition duration-300">
            <CardHeader>
              <CardTitle>📅 Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Check your upcoming work schedule.</p>
              <Button className="mt-4" onClick={() => nav("/fundi/schedule")}>
                View Schedule
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition duration-300">
            <CardHeader>
              <CardTitle>🧾 Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Track your payments and earnings.</p>
              <Button className="mt-4" onClick={() => nav("/fundi/earnings")}>
                View Earnings
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition duration-300">
            <CardHeader>
              <CardTitle>👤 Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Update your profile details and experience.</p>
              <Button className="mt-4" onClick={() => nav("/fundi/profile")}>
                Go to Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition duration-300">
            <CardHeader>
              <CardTitle>📩 Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Chat with clients and admins.</p>
              <Button className="mt-4" onClick={() => nav("/fundi/messages")}>
                Open Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default FundiDashboard
