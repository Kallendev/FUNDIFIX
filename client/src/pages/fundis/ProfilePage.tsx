import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login'); // redirect if not logged in
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <h1 className="text-3xl font-bold text-orange-400 mb-6">Fundi Profile</h1>
      <Card className="bg-[#1a1a1a] text-white max-w-md mx-auto shadow-lg rounded-2xl p-6">
        <CardContent>
          <div className="flex flex-col items-center">
            <img
              src="https://api.dicebear.com/7.x/identicon/svg?seed=Fundi"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500"
            />
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-400 mb-2">{user.email}</p>
            <p className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mb-4">{user.role.toUpperCase()}</p>
            <p className="text-sm text-gray-500">Joined on: {new Date(user.createdAt).toLocaleDateString()}</p>
            <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl">
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
