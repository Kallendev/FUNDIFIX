import React from 'react';

const ClientDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Client Dashboard</h1>
      <p className="text-gray-600">Karibu Client 🙌</p>

      {/* Client specific actions */}
      <div className="mt-6">
        <ul className="list-disc ml-6 space-y-2">
          <li>Post a Job</li>
          <li>Track Job Status</li>
          <li>Chat with Fundi</li>
          <li>View Payments</li>
        </ul>
      </div>
    </div>
  );
};

export default ClientDashboard;
