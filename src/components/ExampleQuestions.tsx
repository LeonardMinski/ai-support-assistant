type Props = {
  onSelect: (question: string) => void;
};

export default function ExampleQuestions({ onSelect }: Props) {
  const questions = [
    "How do I reset my password?",
    "What is your refund policy?",
    "How do I contact support?",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((question) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          className="rounded border px-2 py-1 text-xs hover:bg-gray-100"
        >
          {question}
        </button>
      ))}
    </div>
  );
}