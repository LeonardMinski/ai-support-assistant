import { exampleQuestions } from "@/lib/chatConstants";

type Props = {
  onSelect: (question: string) => void;
  disabled?: boolean;
};

export default function ExampleQuestions({ onSelect, disabled = false }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {exampleQuestions.map((question) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          className="rounded border px-2 py-1 text-xs hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled}
          type="button"
        >
          {question}
        </button>
      ))}
    </div>
  );
}
