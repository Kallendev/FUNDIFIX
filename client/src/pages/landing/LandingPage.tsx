// src/pages/landing/LandingPage.tsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Search, Zap, CreditCard, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: <Search className="w-7 h-7 text-white" />,
    title: "Find Local Fundis",
    description: "Connect with verified handymen in your area",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-white" />,
    title: "Verified Professionals",
    description: "All fundis are background-checked and rated",
  },
  {
    icon: <CreditCard className="w-7 h-7 text-white" />,
    title: "Secure Payments",
    description: "Safe and secure payment processing",
  },
  {
    icon: <Zap className="w-7 h-7 text-white" />,
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
        <h1 className="text-3xl font-extrabold tracking-wide text-[#00FFFF]">
          Fundi<span className="text-[#FFA500]">Fix</span>
        </h1>
        <div className="space-x-4">
          <Button
            onClick={() => nav("/login")}
            size="lg"
            className="bg-[#00FFFF] text-black hover:bg-[#00e6e6] transition-all duration-300 shadow-lg"
          >
            🔑 Login
          </Button>
          <Button
            variant="outline"
            onClick={() => nav("/register")}
            size="lg"
            className="border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-black transition-all duration-300 shadow-lg"
          >
            📝 Register
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Connect with Verified{" "}
          <span className="text-[#FFA500]">Fundis</span> Across Kenya
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl">
          Need a plumber, electrician, or carpenter? FundiFix helps you find skilled
          local experts—fast, secure, and reliable.
        </p>
        <Button
          onClick={() => nav("/register")}
          size="lg"
          className="bg-[#FFA500] text-black hover:bg-[#e69500] transition-all duration-300 shadow-lg px-8 py-6 text-lg"
        >
          🚀 Get Started
        </Button>
      </section>

      {/* Why Choose FundiFix */}
      <section className="bg-[#121212] py-16 px-6 mt-20 text-center max-w-6xl mx-auto rounded-2xl shadow-2xl">
        <h3 className="text-3xl font-bold text-white mb-2">Why Join FundiFix?</h3>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto">
          We make it easy to connect with trusted professionals, no matter where you are.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="group bg-gradient-to-b from-[#1e1e1e] to-[#151515] rounded-xl p-8 flex flex-col items-center shadow-lg hover:shadow-[#FFA500]/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-[#FFA500] group-hover:scale-110 transition-transform">
                {icon}
              </div>
              <h4 className="font-semibold text-lg text-white mb-2">
                {title}
              </h4>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          ))}
        </div>

        {/* Extra perks with ticks */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
          {[
            "Affordable rates for all services",
            "Skilled and experienced fundis",
            "24/7 customer support",
            "Nationwide coverage",
          ].map((perk, i) => (
            <div key={i} className="flex items-center space-x-3">
              <CheckCircle2 className="text-[#00FFFF] w-6 h-6" />
              <span className="text-gray-300">{perk}</span>
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
          Join FundiFix today and connect with the best local fundis near you.
          Secure, fast, and reliable service at your fingertips.
        </p>
        <div className="space-x-4">
          <Button
            onClick={() => nav("/register")}
            size="lg"
            className="bg-[#FFA500] text-black hover:bg-[#e69500] transition-all duration-300 shadow-lg"
          >
            📝 Register Now
          </Button>
          <Button
            onClick={() => nav("/login")}
            size="lg"
            className="bg-[#00FFFF] text-black hover:bg-[#00e6e6] transition-all duration-300 shadow-lg"
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
