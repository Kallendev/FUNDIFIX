// src/pages/landing/LandingPage.tsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-[#1f1f1f]">
        <h1 className="text-2xl font-bold text-[#00FFFF]">FundiFix</h1>
        <div className="space-x-4">
          <Button onClick={() => nav("/login")} size="lg" className="bg-[#00FFFF] text-black hover:bg-[#00e6e6]">
  🔑 Login
</Button>

          <Button
            variant="outline"
            onClick={() => nav("/register")}
            size="lg"
            className="border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-black"
          >
            📝 Register
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
          Connect with Verified{" "}
          <span className="text-[#FFA500]">Fundis</span> Across Kenya
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          Need a plumber, electrician, or carpenter? FundiFix helps you find skilled
          local experts—fast, secure, and reliable.
        </p>
        <div className="space-x-4">
          <Button
            onClick={() => nav("/login")}
            size="lg"
            className="bg-[#00FFFF] text-black hover:bg-[#00e6e6]"
          >
            🔑 Login
          </Button>
          <Button
            variant="outline"
            onClick={() => nav("/register")}
            size="lg"
            className="border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-black"
          >
            📝 Register
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
