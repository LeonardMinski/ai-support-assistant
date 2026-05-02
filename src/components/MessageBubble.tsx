import type { ChatMessage } from "@/types/chat";

type Props = {
  message: ChatMessage;
};

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
