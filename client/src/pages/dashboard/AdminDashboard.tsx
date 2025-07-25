import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600">Welcome Admin 👑</p>

      {/* Add real admin components here */}
      <div className="mt-6">
        <ul className="list-disc ml-6 space-y-2">
          <li>Manage Users</li>
          <li>Post Jobs</li>
          <li>View Reports</li>
          <li>Assign Roles</li>
        </ul>
      </div>
      
    </div>
  );
};

export default AdminDashboard;
