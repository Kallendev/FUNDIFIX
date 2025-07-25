import React from 'react';

const JobPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Available Jobs 🧰</h1>
      <p className="mb-6 text-gray-600">
        Browse through all the jobs posted by clients. Fundis can view job descriptions and apply to those that match their skills.
      </p>

      {/* Dummy job list for now */}
      <div className="space-y-4">
        <div className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold">Fix Leaking Tap</h2>
          <p className="text-sm text-gray-500">Location: Nairobi</p>
          <p className="text-gray-700 mt-2">
            A leaking tap needs urgent repair. Preferably done by the end of the day.
          </p>
        </div>

        <div className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold">Install Solar Panel</h2>
          <p className="text-sm text-gray-500">Location: Meru</p>
          <p className="text-gray-700 mt-2">
            Looking for a certified solar technician to install a 300W solar panel system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
