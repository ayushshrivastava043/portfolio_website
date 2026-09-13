import { chatbotApiUrl } from "@/data/site";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function sendChatMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  try {
    const res = await fetch(chatbotApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history: history.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!res.ok) {
      throw new Error(`Chat API ${res.status}`);
    }

    const data = (await res.json()) as {
      reply?: string;
      response?: string;
      answer?: string;
      message?: string;
    };

    return (
      data.reply ||
      data.response ||
      data.answer ||
      data.message ||
      "I couldn't generate a reply. Try asking about Verifast, CGI, or Durham MBA."
    );
  } catch {
    return "The AI backend is waking up or unreachable. Try again in a moment — or browse Work / Consulting while Render cold-starts.";
  }
}
