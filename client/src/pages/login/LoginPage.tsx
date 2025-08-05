import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { loginUser } from "@/api/jobs"

const LoginPage = () => {
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await loginUser({ email, password })
      console.log("✅ Login success:", res)

      localStorage.setItem("token", res.token)
      localStorage.setItem("role", res.user.role)
      localStorage.setItem("user", JSON.stringify(res.user))

      switch (res.user.role) {
        case "admin":
          nav("/admin")
          break
        case "fundi":
          nav("/fundi")
          break
        default:
          nav("/client")
      }
    } catch (err: any) {
      console.error("❌ Login failed:", err)
      setError(err?.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user") || "null")

    if (token && user) {
      switch (user.role) {
        case "admin":
          nav("/admin")
          break
        case "fundi":
          nav("/fundi")
          break
        default:
          nav("/client")
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0c0c] text-white px-4">
      <Card className="w-full max-w-md shadow-xl border border-orange-500 rounded-2xl bg-[#131313]">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-orange-400">🔐 Welcome Back</h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-[#1a1a1a] text-white"
              />
            </div>

                        <div className="relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[#1a1a1a] text-white pr-10"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center top-[20px] text-[#00bfff] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#00bfff] text-black hover:bg-[#0099cc]"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => nav("/register")}
              className="text-orange-400 hover:underline cursor-pointer"
            >
              Register here
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
