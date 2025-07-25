
const FundiPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Find a Fundi 👷‍♂️</h1>
      <p className="mb-6 text-gray-600">
        Here’s a list of skilled fundis available for hire. Browse their profiles and hire the best fit for your job.
      </p>

      {/* Dummy fundi list for now */}
      <div className="space-y-4">
        <div className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold">Jane Mwangi</h2>
          <p className="text-sm text-gray-500">Electrician | Nairobi</p>
          <p className="text-gray-700 mt-2">
            Experienced in wiring, lighting installation, and electrical repairs.
          </p>
        </div>

        <div className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold">John Otieno</h2>
          <p className="text-sm text-gray-500">Plumber | Kisumu</p>
          <p className="text-gray-700 mt-2">
            Reliable plumber with 5+ years experience fixing leaks and installing piping systems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundiPage;
