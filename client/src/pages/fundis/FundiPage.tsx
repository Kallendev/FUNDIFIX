import { useEffect, useState } from "react";
import instance from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface Fundi {
  _id: string;
  name: string;
  email: string;
  role: string;
  location?: string;
  skills?: string | string[] | null;
  profileImage?: string;
}

const FundiPage = () => {
  const [fundis, setFundis] = useState<Fundi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFundis = async () => {
      try {
        const res = await instance.get("/users/fundis");
        setFundis(res.data);
      } catch (err) {
        console.error("Failed to fetch fundis:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFundis();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-electricBlue text-lg font-semibold" style={{ color: "#00F0FF" }}>
        ⏳ Loading available fundis...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto" style={{ backgroundColor: "#0f0f0f", minHeight: "100vh" }}>
      <h1
        className="text-4xl font-extrabold mb-4 drop-shadow-lg"
        style={{ color: "#f97316" /* orange-400 */ }}
      >
        Find a Fundi 👷‍♂️
      </h1>
      <p className="mb-8 text-gray-400 max-w-xl">
        Here’s a list of skilled fundis available for hire. Browse their profiles and hire the best fit for your job.
      </p>

      {fundis.length === 0 ? (
        <p className="text-gray-500 text-center text-lg mt-16">
          No fundis available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fundis.map((fundi) => {
            let skillsArr: string[] = [];
            if (Array.isArray(fundi.skills)) {
              skillsArr = fundi.skills;
            } else if (typeof fundi.skills === "string") {
              skillsArr = fundi.skills.split(",").map((s) => s.trim()).filter(Boolean);
            }

            return (
              <Card
                key={fundi._id}
                className="rounded-3xl border border-electricBlue shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                <CardHeader className="flex flex-col items-center pt-8">
                  <div
                    className="relative w-28 h-28 rounded-full overflow-hidden shadow-lg mb-4"
                    style={{ border: "4px solid #00F0FF" }}
                  >
                    <img
                      src={fundi.profileImage || "https://via.placeholder.com/150"}
                      alt={`${fundi.name} profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-white">
                    {fundi.name}
                  </CardTitle>
                  <div className="flex items-center text-electricBlue mt-1 space-x-2" style={{ color: "#00F0FF" }}>
                    <MapPin size={18} />
                    <span className="text-sm font-medium">{fundi.location || "Location not provided"}</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col justify-between px-8 pb-8 pt-4">
                  <div className="mb-6">
                    {skillsArr.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {skillsArr.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-white text-black text-sm font-semibold px-3 py-1 rounded-full shadow-sm select-none"
                            style={{ boxShadow: "0 0 6px #d47e40aa" }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">No skills info provided.</p>
                    )}
                  </div>
                  <Button
                    className="bg-orange-400 hover:bg-orange-500 text-black font-bold rounded-full shadow-md transition-transform hover:scale-105"
                    style={{ boxShadow: "0 0 8px #d47e40aa" }}
                  >
                    Hire Me
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FundiPage;
