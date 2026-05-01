"use client";

import { useState } from "react";
import ChatInput from "./ChatInput";
import ExampleQuestions from "./ExampleQuestions";
import MessageBubble from "./MessageBubble";
type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
   setLoading(true);

fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message: text }),
})
  .then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "OpenAI request failed");
    }

    return data;
  })
  .then((data) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.reply || "No response",
      },
    ]);
  })
  .catch(() => {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "I can only answer based on the support knowledge base provided.",
      },
    ]);
  })
  .finally(() => {
    setLoading(false);
  });
  };

  return (
    <div className="flex flex-col gap-4">
      <ExampleQuestions onSelect={handleSend} />

      <div className="h-80 overflow-y-auto rounded border bg-gray-50 p-3">
        {messages.length === 0 && (
          <p className="text-sm text-gray-500">
            Ask a question to start the conversation.
          </p>
        )}

        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}

        {loading && <p className="text-sm text-gray-500">Thinking...</p>}
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}