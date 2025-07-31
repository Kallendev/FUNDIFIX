import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ScheduleItem {
  _id: string;
  jobTitle: string;
  location: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

const FundiSchedulePage = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const fundiId = localStorage.getItem("userId"); // Assuming login sets this
        const res = await axios.get(`http://localhost:5000/api/schedule?fundiId=${fundiId}`);
        setSchedule(res.data);
      } catch (err) {
        console.error("Error fetching schedule:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0f1c] text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-orange-400 mb-6">📅 Fundi Schedule</h2>
        <p className="mb-4 text-[#7DF9FF]">Stay updated with your latest tasks and appointments.</p>

        {loading ? (
          <p className="text-[#7DF9FF]">Loading schedule...</p>
        ) : schedule.length === 0 ? (
          <p className="text-gray-400">You have no scheduled tasks.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schedule.map((item) => (
              <Card key={item._id} className="bg-[#1a1f36] border border-[#2b2f4a] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#7DF9FF]">{item.jobTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    📍 <span className="text-white">{item.location}</span>
                  </p>
                  <p className="text-gray-300">
                    📆 <span className="text-white">{item.date}</span>
                  </p>
                  <p className="text-gray-300">
                    ⏰ <span className="text-white">{item.time}</span>
                  </p>
                  <p className="mt-2">
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded-full ${
                        item.status === "upcoming"
                          ? "bg-orange-500 text-black"
                          : item.status === "completed"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FundiSchedulePage;
