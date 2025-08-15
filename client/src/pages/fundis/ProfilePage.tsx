import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type User = {
  name: string;
  email: string;
  role?: string;
  skills?: string[];
  experience?: string;
  location?: string;
  profileImage?: string | null;
  createdAt?: string;
  [key: string]: any;
};

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [imageVersion, setImageVersion] = useState(0);

  const [formData, setFormData] = useState({
    skills: '',
    experience: '',
    location: '',
    profileImage: null as File | string | null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData: User = res.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        setFormData({
          skills: userData.skills?.join(', ') || '',
          experience: userData.experience || '',
          location: userData.location || '',
          profileImage: userData.profileImage || null,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const fd = new FormData();
      fd.append('skills', formData.skills.trim());
      fd.append('experience', formData.experience.trim());
      fd.append('location', formData.location.trim());

      if (formData.profileImage instanceof File) {
        fd.append('profileImage', formData.profileImage);
      }

      const res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/profile`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser: User = res.data.user || res.data;
      const newProfileImage =
        updatedUser.profileImage && updatedUser.profileImage.length > 0
          ? updatedUser.profileImage
          : user?.profileImage || null;

      setUser(updatedUser);
      setFormData({
        skills: updatedUser.skills?.join(', ') || '',
        experience: updatedUser.experience || '',
        location: updatedUser.location || '',
        profileImage: newProfileImage,
      });

      setImageVersion((v) => v + 1);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <p className="text-orange-400">Loading your profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Banner Section */}
      <div className="relative h-48 bg-gradient-to-r from-orange-500 to-pink-500">
        <div
          onClick={editing ? handleImageClick : undefined}
          className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 w-28 h-28 rounded-full border-4 border-[#0f0f0f] overflow-hidden cursor-pointer shadow-lg"
        >
          <img
            src={
              formData.profileImage instanceof File
                ? URL.createObjectURL(formData.profileImage)
                : typeof formData.profileImage === 'string' && formData.profileImage.length > 0
                ? `${import.meta.env.VITE_API_BASE_URL}${formData.profileImage}?v=${imageVersion}`
                : user?.profileImage && user.profileImage.length > 0
                ? `${import.meta.env.VITE_API_BASE_URL}${user.profileImage}?v=${imageVersion}`
                : `https://api.dicebear.com/7.x/identicon/svg?seed=${user?.name || 'Fundi'}`
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
          {editing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Plus className="text-white w-8 h-8" />
            </div>
          )}
        </div>
        <input
          type="file"
          name="profileImage"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      {/* Profile Card */}
      <div className="max-w-2xl mx-auto mt-20 px-4">
        <Card className="bg-[#1a1a1a] rounded-2xl shadow-xl p-6">
          <CardContent className="text-center">
            {!editing ? (
              <>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
                {user.role && (
                  <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-orange-400 text-black font-semibold">
                    {user.role.toUpperCase()}
                  </span>
                )}
                <div className="mt-6 space-y-2 text-left">
                  <p><strong>Skills:</strong> {user.skills?.join(', ') || 'N/A'}</p>
                  <p><strong>Experience:</strong> {user.experience || 'N/A'}</p>
                  <p><strong>Location:</strong> {user.location || 'N/A'}</p>
                  <p><strong>Joined:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
                <Button
                  onClick={() => setEditing(true)}
                  className="mt-6 bg-orange-400 hover:bg-orange-500 text-black px-6 py-2 rounded-xl"
                >
                  Edit Profile
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Skills (comma separated)"
                  className="w-full bg-[#0f0f0f] text-white border border-gray-700 rounded-lg p-3"
                />
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Experience"
                  className="w-full bg-[#0f0f0f] text-white border border-gray-700 rounded-lg p-3"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full bg-[#0f0f0f] text-white border border-gray-700 rounded-lg p-3"
                />
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={handleSave}
                    style={{ backgroundColor: '#00F0FF', color: '#000' }}
                    className="px-6 py-2 rounded-xl"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditing(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-xl"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
