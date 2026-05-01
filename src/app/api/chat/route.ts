import OpenAI from "openai";
import { knowledgeBase } from "@/data/KnowledgeBase";
import { findAnswer } from "@/lib/findAnswer";

export async function POST(req: Request) {
  let fallbackQuestion = "";

  try {
    const body = await req.json();
    const message = body?.message;

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    fallbackQuestion = message;

    if (process.env.USE_MOCK_AI === "true") {
      return Response.json({ reply: findAnswer(message) });
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ reply: findAnswer(message) });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const context = knowledgeBase
      .map((item) => `${item.topic}: ${item.content}`)
      .join("\n");

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a support assistant. Only answer using the provided knowledge base. If the answer is not in the knowledge base, say: I can only answer based on the support knowledge base provided.",
        },
        {
          role: "user",
          content: `Knowledge base:\n${context}\n\nQuestion:\n${message}`,
        },
      ],
    });

    return Response.json({
      reply:
        response.choices[0]?.message?.content ??
        "I could not generate a response.",
    });
  } catch (error) {
    console.error("Chat API error:", error);

    if (fallbackQuestion) {
      return Response.json({ reply: findAnswer(fallbackQuestion) });
    }

    return Response.json(
      { error: "I can only answer based on the support knowledge base provided." },
      { status: 500 }
    );
  }
}