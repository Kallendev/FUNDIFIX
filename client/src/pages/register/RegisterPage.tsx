// src/pages/register/RegisterPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { registerUser } from '@/api/jobs';// ✅ import your register function

const RegisterPage = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);
      console.log("✅ Registered:", res.data);

      // You can redirect or show a success message here
      nav("/login");
    } catch (error: any) {
      console.error("❌ Registration error:", error?.response?.data || error.message);
      // Optionally display error to user
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
