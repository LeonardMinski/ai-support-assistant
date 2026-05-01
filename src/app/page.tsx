import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-4 text-2xl font-semibold">AI Support Assistant</h1>

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