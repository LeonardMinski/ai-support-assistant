"use client";

import { useState } from "react";
import { sendChatMessage } from "@/lib/chatApi";
import { fallbackMessage } from "@/lib/chatConstants";
import type { ChatMessage } from "@/types/chat";
import ChatInput from "./ChatInput";
import ExampleQuestions from "./ExampleQuestions";
import MessageBubble from "./MessageBubble";

export default function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const reply = await sendChatMessage(text);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: fallbackMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ExampleQuestions onSelect={handleSend} disabled={loading} />

      <div
        aria-label="Chat conversation"
        aria-live="polite"
        className="h-80 overflow-y-auto rounded border bg-gray-50 p-3"
      >
        {messages.length === 0 && (
          <p className="text-sm text-gray-500">
            Ask a question to start the conversation.
          </p>
        )}

        {messages.map((message, index) => (
          <MessageBubble key={`${message.role}-${index}`} message={message} />
        ))}

        {loading && <p className="text-sm text-gray-500">Thinking...</p>}
      </div>

      <div className="flex items-center gap-2">
        <ChatInput onSend={handleSend} disabled={loading} />
        <button
          className="rounded border px-3 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => setMessages([])}
          disabled={loading || messages.length === 0}
          type="button"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
