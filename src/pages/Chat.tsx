import { useState } from "react";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Send } from "lucide-react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const { messages, sendMessage, isConnected } = useWebSocket();
  const { logout } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Echo Chat</h1>
          <div className="flex items-center gap-4">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-bubble ${
                  msg.isUser ? "user-message" : "echo-message"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="input-container">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}