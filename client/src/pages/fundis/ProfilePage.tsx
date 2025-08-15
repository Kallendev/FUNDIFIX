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

// Helper to ensure all URLs are HTTPS
const httpsUrl = (url: string) => {
  if (!url) return url;
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
};

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [imageVersion, setImageVersion] = useState(0);

  const [formData, setFormData] = useState<{
    skills: string;
    experience: string;
    location: string;
    profileImage: File | string | null;
  }>({
    skills: '',
    experience: '',
    location: '',
    profileImage: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.profileImage) {
        parsedUser.profileImage = httpsUrl(parsedUser.profileImage);
      }
      setUser(parsedUser);
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
        if (userData.profileImage) {
          userData.profileImage = httpsUrl(userData.profileImage);
        }

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
      if (updatedUser.profileImage) {
        updatedUser.profileImage = httpsUrl(updatedUser.profileImage);
      }

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setFormData({
        skills: updatedUser.skills?.join(', ') || '',
        experience: updatedUser.experience || '',
        location: updatedUser.location || '',
        profileImage:
          formData.profileImage instanceof File
            ? formData.profileImage
            : updatedUser.profileImage,
      });

      setImageVersion((v) => v + 1);
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

  const profileImageSrc =
    formData.profileImage instanceof File
      ? URL.createObjectURL(formData.profileImage)
      : typeof formData.profileImage === 'string' && formData.profileImage.length > 0
      ? `${httpsUrl(formData.profileImage)}?v=${imageVersion}`
      : user?.profileImage && user.profileImage.length > 0
      ? `${httpsUrl(import.meta.env.VITE_API_BASE_URL + user.profileImage)}?v=${imageVersion}`
      : `https://api.dicebear.com/7.x/identicon/svg?seed=${user?.name || 'Fundi'}`;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <h1 className="text-3xl font-bold text-orange-400 mb-6">Fundi Profile</h1>

      <Card className="bg-[#1a1a1a] max-w-lg mx-auto shadow-lg rounded-2xl overflow-hidden">
        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-[#00F0FF] to-[#00c0cc]" />

        <CardContent>
          <div className="flex flex-col items-center -mt-16">
            {/* Profile Image */}
            <div
              onClick={editing ? handleImageClick : undefined}
              className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#00F0FF] cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <img
                src={profileImageSrc}
                alt="Profile"
                className="w-full h-full object-cover opacity-0 animate-fadeIn"
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

            {/* Details */}
            {!editing ? (
              <>
                <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
                <p
                  className="px-3 py-1 rounded-full text-sm mt-2"
                  style={{ backgroundColor: '#00F0FF', color: '#000' }}
                >
                  {user.role?.toUpperCase()}
                </p>
                <div className="mt-4 space-y-1 text-sm text-gray-400">
                  <p><span className="text-white">Skills:</span> {user.skills?.join(', ') || 'N/A'}</p>
                  <p><span className="text-white">Experience:</span> {user.experience || 'N/A'}</p>
                  <p><span className="text-white">Location:</span> {user.location || 'N/A'}</p>
                  <p><span className="text-white">Joined on:</span> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
                <Button
                  onClick={() => setEditing(true)}
                  className="mt-5 bg-orange-400 hover:bg-orange-500 text-black px-4 py-2 rounded-xl"
                >
                  Edit Profile
                </Button>
              </>
            ) : (
              <div className="w-full space-y-3 mt-4">
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Skills (comma separated)"
                  className="w-full bg-[#0f0f0f] text-white border border-gray-700 rounded-lg p-2"
                />
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Experience (e.g., 5 years)"
                  className="w-full bg-[#0f0f0f] text-white border border-gray-700 rounded-lg p-2"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full bg-[#0f0f0f] text-white border border-gray-700 rounded-lg p-2"
                />
                <div className="flex gap-3">
                  <Button
                    onClick={handleSave}
                    style={{ backgroundColor: '#00F0FF', color: '#000' }}
                    className="px-4 py-2 rounded-xl"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditing(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
