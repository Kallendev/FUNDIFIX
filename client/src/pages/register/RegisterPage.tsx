import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { registerUser, loginUser } from "@/api/jobs"; // 👈 Make sure loginUser is imported

const RegisterPage = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client", // 👈 Default role
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Register the user
      const res = await registerUser(formData);
      console.log("✅ Registered:", res.data);

      // Auto-login the user
      const loginRes = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      console.log("🔐 Auto-login success:", loginRes);

      // Store token and role
      localStorage.setItem("token", loginRes.token);
      localStorage.setItem("role", loginRes.role);

      // Redirect based on role
      switch (loginRes.role) {
        case "admin":
          nav("/admin");
          break;
        case "fundi":
          nav("/fundi");
          break;
        default:
          nav("/client");
      }
    } catch (error: any) {
      console.error("❌ Error:", error?.response?.data || error.message);
      alert(error?.response?.data?.message || "Registration/Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0c0c] text-white px-4">
      <Card className="w-full max-w-md shadow-xl border border-orange-500 rounded-2xl bg-[#131313]">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-orange-400">📝 Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                className="bg-[#1a1a1a] text-white"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#1a1a1a] text-white"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="bg-[#1a1a1a] text-white"
              />
            </div>

            {/* 🔽 Role Dropdown */}
            <div>
              <Label htmlFor="role">Select Role</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="bg-[#1a1a1a] text-white border border-gray-600 rounded-md px-3 py-2 w-full"
              >
                <option value="client">Client</option>
                <option value="fundi">Fundi</option>
                <option value="admin" disabled>Admin (restricted)</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full mt-2 bg-[#00bfff] text-black hover:bg-[#0099cc]"
            >
              ✅ Register
            </Button>
          </form>

          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <span
              onClick={() => nav("/login")}
              className="text-orange-400 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
