import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const AdminDashboard = () => {
  const nav = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    nav("/")
  }

  return (
    <div className="min-h-screen bg-[#0c0f1c] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">🛠️ Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-[#1a1f36] text-white border border-[#2b2f4a] hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-orange-400">Manage Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Post, assign or remove job listings.</p>
              <Button className="mt-4 bg-electricblue hover:bg-blue-700" onClick={() => nav("/admin/jobs")}>
                Go to Jobs
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1f36] text-white border border-[#2b2f4a] hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-orange-400">Fundis</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and manage registered fundis.</p>
              <Button className="mt-4 bg-electricblue hover:bg-blue-700" onClick={() => nav("/admin/fundis")}>
                View Fundis
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1f36] text-white border border-[#2b2f4a] hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-orange-400">Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage client accounts and support.</p>
              <Button className="mt-4 bg-electricblue hover:bg-blue-700" onClick={() => nav("/admin/clients")}>
                View Clients
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
