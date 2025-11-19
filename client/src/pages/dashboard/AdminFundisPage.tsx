import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Star, Phone, MessageCircle, Briefcase, ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Fundi {
  _id: string;
  name: string;
  email: string;
  role: string;
  location?: string;
  skills?: string | string[] | null;
  profileImage?: string;
  phone?: string;
  averageRating?: number;
  ratings?: any[];
  jobsCompleted?: number;
}

const AdminFundisPage = () => {
  const navigate = useNavigate();
  const [fundis, setFundis] = useState<Fundi[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedFundi, setSelectedFundi] = useState<Fundi | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const handleRatingSubmit = async () => {
    if (!selectedFundi || rating < 1) return;

    try {
      setSubmitting(true);
      await instance.post(`/users/${selectedFundi._id}/rate`, {
        rating,
        comment,
      });

      const res = await instance.get("/users/fundis");
      setFundis(res.data);

      setRatingDialogOpen(false);
      setRating(0);
      setComment("");
      setSelectedFundi(null);
    } catch (error) {
      console.error("Failed to submit rating:", error);
      alert("Failed to submit rating. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const openRatingDialog = (fundi: Fundi) => {
    setSelectedFundi(fundi);
    setRatingDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-electricBlue text-lg font-semibold" style={{ color: "#00F0FF" }}>
        Loading fundis...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto" style={{ backgroundColor: "#0f0f0f", minHeight: "100vh" }}>
      <div className="flex items-center mb-6">
        <Button
          onClick={() => navigate("/admin")}
          variant="ghost"
          className="mr-4 text-orange-400 hover:text-orange-300"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Dashboard
        </Button>
      </div>

      <h1
        className="text-4xl font-extrabold mb-4 drop-shadow-lg"
        style={{ color: "#f97316" }}
      >
        Manage Fundis 👷‍♂️
      </h1>
      <p className="mb-8 text-gray-400 max-w-xl">
        View and manage all registered fundis, their ratings, and contact information.
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
                  <div className="mb-4">
                    {skillsArr.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {skillsArr.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-white text-black text-sm font-semibold px-3 py-1 rounded-full shadow-sm select-none"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic mb-4">No skills info provided.</p>
                    )}

                    <div className="space-y-3">
                      {fundi.phone && (
                        <div className="flex items-center text-sm text-gray-300">
                          <Phone size={16} className="mr-2 text-electricblue" />
                          <a href={`tel:${fundi.phone}`} className="hover:text-electricblue">
                            {fundi.phone}
                          </a>
                        </div>
                      )}

                      <div className="flex items-center text-sm text-gray-300">
                        <Star size={16} className="mr-2 text-yellow-400" fill="currentColor" />
                        <span>
                          {fundi.averageRating?.toFixed(1) || "0.0"} ({fundi.ratings?.length || 0} ratings)
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-300">
                        <Briefcase size={16} className="mr-2 text-electricblue" />
                        <span>{fundi.jobsCompleted || 0} jobs completed</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => openRatingDialog(fundi)}
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full"
                        >
                          <Star className="mr-2" size={16} />
                          Rate Fundi
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#1a1f36] text-white border-electricblue">
                        <DialogHeader>
                          <DialogTitle>Rate {selectedFundi?.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Rating (1-5 stars)</Label>
                            <div className="flex gap-2 mt-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => setRating(star)}
                                  className={`text-3xl ${
                                    star <= rating ? "text-yellow-400" : "text-gray-600"
                                  }`}
                                >
                                  ★
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label>Comment (optional)</Label>
                            <Textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Share your experience..."
                              className="bg-[#0e1320] border-gray-600 text-white"
                            />
                          </div>
                          <Button
                            onClick={handleRatingSubmit}
                            disabled={rating < 1 || submitting}
                            className="w-full bg-orange-400 hover:bg-orange-500 text-black font-bold"
                          >
                            {submitting ? "Submitting..." : "Submit Rating"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      className="w-full bg-electricblue hover:bg-blue-600 text-black font-bold rounded-full"
                      onClick={() => alert(`Chat feature coming soon for ${fundi.name}`)}
                    >
                      <MessageCircle className="mr-2" size={16} />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminFundisPage;
