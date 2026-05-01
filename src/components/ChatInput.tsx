"use client";

import { useState } from "react";

type Props = {
  onSend: (text: string) => void;
  disabled: boolean;
};

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 rounded border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
        placeholder="Ask a question..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />

      <button
        className="rounded bg-blue-600 px-4 text-sm text-white disabled:opacity-50"
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
      >
        Send
      </button>
    </div>
  );
}