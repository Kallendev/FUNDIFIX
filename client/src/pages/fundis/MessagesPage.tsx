import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const dummyConversations = [
  { id: "1", name: "Alice", messages: [{ from: "fundi", text: "Hello!" }, { from: "Alice", text: "Hi, I need help!" }] },
  { id: "2", name: "Bob", messages: [{ from: "fundi", text: "Available tomorrow" }, { from: "Bob", text: "Great!" }] },
]

const MessagesPage = () => {
  const [activeChatId, setActiveChatId] = useState("1")

  const activeConversation = dummyConversations.find(c => c.id === activeChatId)

  return (
    <div className="min-h-screen bg-[#0c0f1c] text-white p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Sidebar */}
      <div className="md:col-span-1 space-y-2">
        <h2 className="text-xl font-bold text-orange-400">💬 Conversations</h2>
        {dummyConversations.map(conv => (
          <Card
            key={conv.id}
            onClick={() => setActiveChatId(conv.id)}
            className={`cursor-pointer p-2 border ${activeChatId === conv.id ? 'border-orange-400 text-[#7DF9FF]' : 'border-[#2b2f4a] text-white'} bg-[#1a1f36] hover:text-[#7DF9FF]`}

          >
            <p>{conv.name}</p>
          </Card>
        ))}
      </div>

      {/* Chat Window */}
      <div className="md:col-span-2 bg-[#1a1f36] p-4 rounded-lg border border-[#2b2f4a]">
        <h3 className="text-lg font-bold text-electric-blue mb-2">
          Chat with {activeConversation?.name}
        </h3>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {activeConversation?.messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 max-w-[75%] rounded-xl ${
                msg.from === "fundi" ? "bg-orange-500 ml-auto text-white" : "bg-[#2b2f4a] text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Send Message (static for now) */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-[#2b2f4a] p-2 rounded-lg text-white"
          />
          <button className="bg-orange-500 px-4 py-2 rounded-lg text-white">Send</button>
        </div>
      </div>
    </div>
  )
}

export default MessagesPage
