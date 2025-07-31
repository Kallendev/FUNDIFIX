import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define message thread structure
interface MessageThread {
  _id: string;
  participants: string[];
  lastMessage: string;
}

// Main component
const MessagesTab = () => {
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // Load threads from backend
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await axios.get(`/api/messages/client/${userId}`);
        setThreads(res.data);
      } catch (err) {
        console.error("❌ Failed to load messages:", err);
      }
    };

    if (userId) fetchThreads();
  }, [userId]);

  const handleThreadClick = (threadId: string) => {
    navigate(`/client/messages/${threadId}`);
  };

  return (
    <div className="text-white px-4 py-6 bg-[#0d1117] min-h-screen">
      <h2 className="text-2xl font-bold text-orange-400 mb-6">💬 Your Chats</h2>

      {threads.length === 0 ? (
        <p className="text-[#7DF9FF]">No active conversations yet.</p>
      ) : (
        <ul className="space-y-4">
          {threads.map((thread) => {
            const otherUsers = thread.participants.filter((p) => p !== userId);

            return (
              <li
                key={thread._id}
                onClick={() => handleThreadClick(thread._id)}
                className="p-4 bg-[#1a1f36] border border-[#2b2f4a] rounded-xl cursor-pointer hover:border-orange-400 hover:shadow-md transition-all"
              >
                <p className="text-[#7DF9FF] font-medium">
                  💌 Chat with: {otherUsers.join(", ")}
                </p>
                <p className="text-sm text-gray-300 mt-1 truncate">
                  📨 {thread.lastMessage || "No messages yet"}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MessagesTab;
