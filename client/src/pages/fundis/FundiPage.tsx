import { useEffect, useState } from "react";
import instance from "@/api/axios"; // ✅ your axios instance with token
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Fundi {
  _id: string;
  name: string;
  email: string;
  role: string;
  location?: string;
  skills?: string;
  profileImage?: string;
}

const FundiPage = () => {
  const [fundis, setFundis] = useState<Fundi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFundis = async () => {
      try {
        const res = await instance.get("/users/fundis"); // ✅ backend route
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
      <div className="p-6 text-center text-gray-500">
        ⏳ Loading available fundis...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Find a Fundi 👷‍♂️</h1>
      <p className="mb-6 text-gray-600">
        Here’s a list of skilled fundis available for hire. Browse their profiles and hire the best fit for your job.
      </p>

      {fundis.length === 0 ? (
        <p className="text-gray-500">No fundis available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fundis.map((fundi) => (
            <Card
              key={fundi._id}
              className="border border-gray-200 hover:shadow-lg transition rounded-2xl overflow-hidden"
            >
              <CardHeader className="flex flex-col items-center">
                <img
                  src={fundi.profileImage || "https://via.placeholder.com/150"}
                  alt={fundi.name}
                  className="w-24 h-24 rounded-full object-cover mb-3 border"
                />
                <CardTitle className="text-lg font-bold">{fundi.name}</CardTitle>
                <p className="text-sm text-gray-500">{fundi.location || "Location not provided"}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  {fundi.skills || "No skills info provided."}
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Hire Me
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FundiPage;
