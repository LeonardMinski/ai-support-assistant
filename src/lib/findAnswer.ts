import { knowledgeBase } from "@/data/KnowledgeBase";

const fallbackMessage = "I can only answer based on the support knowledge base provided.";

function getSearchTerms(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((term) => term.length > 2)
    .flatMap((term) => [term, term.endsWith("s") ? term.slice(0, -1) : term]);
}

export function findAnswer(question: string): string {
  const questionTerms = getSearchTerms(question);

  const match = knowledgeBase.find((item) => {
    const topicTerms = getSearchTerms(item.topic);
    const contentTerms = getSearchTerms(item.content);
    const itemTerms = new Set([...topicTerms, ...contentTerms]);

    return questionTerms.some((term) => itemTerms.has(term));
  });

  if (!match) {
    return fallbackMessage;
  }

  return `Sure - ${match.content}`;
}

export { fallbackMessage };
