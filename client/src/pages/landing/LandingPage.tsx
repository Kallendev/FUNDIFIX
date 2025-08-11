// src/pages/landing/LandingPage.tsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Search, Zap, CreditCard } from "lucide-react";

const features = [
  {
    icon: <Search className="w-6 h-6 text-[#FFA500]" />,
    title: "Find Local Fundis",
    description: "Connect with verified handymen in your area",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#FFA500]" />,
    title: "Verified Professionals",
    description: "All fundis are background-checked and rated",
  },
  {
    icon: <CreditCard className="w-6 h-6 text-[#FFA500]" />,
    title: "Secure Payments",
    description: "Safe and secure payment processing",
  },
  {
    icon: <Zap className="w-6 h-6 text-[#FFA500]" />,
    title: "Quick Response",
    description: "Get responses within minutes",
  },
];

const LandingPage = () => {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-[#1f1f1f]">
        <h1 className="text-2xl font-bold text-[#00FFFF]">FundiFix</h1>
        <div className="space-x-4">
          <Button
            onClick={() => nav("/login")}
            size="lg"
            className="bg-[#00FFFF] text-black hover:bg-[#00e6e6]"
            aria-label="Login"
          >
            🔑 Login
          </Button>

          <Button
            variant="outline"
            onClick={() => nav("/register")}
            size="lg"
            className="border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-black"
            aria-label="Register"
          >
            📝 Register
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
          Connect with Verified{" "}
          <span className="text-[#FFA500]">Fundis</span> Across Kenya
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl">
          Need a plumber, electrician, or carpenter? FundiFix helps you find skilled
          local experts—fast, secure, and reliable.
        </p>
        
      </section>

      {/* Why Choose FundiFix */}
      <section className="bg-[#121212] py-16 px-6 mt-20 text-center max-w-6xl mx-auto rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-white mb-2">Why Choose FundiFix?</h3>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto">
          We make it easy to connect with trusted professionals
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="bg-[#1e1e1e] rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-[#FFA500]/50 transition-shadow cursor-default"
            >
              <div className="mb-4 rounded-full bg-[#FFA500] p-3">
                {icon}
              </div>
              <h4 className="font-semibold text-lg text-white mb-2">{title}</h4>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-4">
          Ready to get started?
        </h3>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Join FundiFix today and connect with the best local fundis near you. Secure, fast, and reliable service at your fingertips.
        </p>
        <div className="space-x-4">
          <Button
            onClick={() => nav("/register")}
            size="lg"
            className="border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-black"
          >
            📝 Register Now
          </Button>
          <Button
            variant="outline"
            onClick={() => nav("/login")}
            size="lg"
            className="bg-[#00FFFF] text-black hover:bg-[#00e6e6]"
          >
            🔑 Login
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-6 border-t border-[#1f1f1f] text-gray-400">
        © {new Date().getFullYear()} FundiFix. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
