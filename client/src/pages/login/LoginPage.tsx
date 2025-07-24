// src/pages/Login.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { loginUser } from "@/api/jobs" // 👈 Make sure path is correct

const Login = () => {
  const nav = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await loginUser(form)
      console.log("✅ Login success:", res)

      // Save token if needed
      localStorage.setItem("token", res.token)

      // Optional: navigate to dashboard
      nav("/")

    } catch (err: any) {
      console.error("❌ Login failed:", err.message || err)
      alert(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-4">
      <Card className="w-full max-w-md shadow-xl border-none bg-[#1a1a1a] text-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-orange-400">Welcome Back 👋</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-[#111] border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="bg-[#111] border-gray-600 text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00bfff] text-white hover:bg-[#0099cc]"
            >
              {loading ? "Logging in..." : "🔐 Login"}
            </Button>
            <p className="text-sm text-center text-gray-400">
              Don't have an account?{" "}
              <span
                onClick={() => nav("/register")}
                className="text-orange-400 cursor-pointer hover:underline"
              >
                Register here
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
