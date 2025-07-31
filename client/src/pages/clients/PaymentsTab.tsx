import { useEffect, useState } from "react";
import axios from "axios";

interface Payment {
  _id: string;
  jobTitle: string;
  amount: number;
  status: string;
  date: string;
}

const PaymentsTab = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(`/api/payments/client/${userId}`);
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to load payments:", err);
      }
    };

    if (userId) fetchPayments();
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#0f111a] text-white px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-400 mb-6">
          💰 My Payments
        </h2>

        {payments.length === 0 ? (
          <p className="text-[#7DF9FF] bg-[#1a1f36] p-4 rounded-lg text-center border border-[#2b2f4a] shadow-sm">
            No payment records found.
          </p>
        ) : (
          <div className="overflow-x-auto bg-[#1a1f36] rounded-xl shadow-lg border border-[#2b2f4a]">
            <table className="w-full text-sm table-auto">
              <thead className="bg-[#1a1f36] text-[#7DF9FF]">
                <tr>
                  <th className="py-3 px-4 text-left">Job</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-[#252b45] transition-all border-t border-[#2b2f4a]"
                  >
                    <td className="py-3 px-4">{p.jobTitle}</td>
                    <td className="py-3 px-4">KES {p.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          p.status === "Paid"
                            ? "bg-green-500 text-black"
                            : "bg-yellow-400 text-black"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{new Date(p.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsTab;
