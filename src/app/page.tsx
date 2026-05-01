import ChatBox from "@/components/ChatBox";

export default function Home() {
  const useMockAI = process.env.USE_MOCK_AI === "true";

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <div className="mb-4 flex items-center gap-3">
        <h1 className="text-2xl font-semibold">AI Support Assistant</h1>
        {useMockAI && (
          <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
            Demo Mode
          </span>
        )}
      </div>

      <p className="mb-6 max-w-md text-center text-sm text-gray-600">
        Ask questions about our services. Responses are based on a limited
        support knowledge base.
      </p>

      <div className="w-full max-w-2xl rounded-xl bg-white p-4 shadow">
        <ChatBox />
      </div>
    </main>
  );
}
