import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "NO_API_KEY", message: "GEMINI_API_KEY is not configured in environment variables." },
        { status: 400 }
      );
    }

    const { messages: rawMessages, questionContext, language: rawLang = 'it' } = await req.json();

    const language = typeof rawLang === 'string' ? rawLang.slice(0, 5) : 'it';
    const messages = Array.isArray(rawMessages)
      ? rawMessages.slice(-10).map((m: { role?: string; content?: string }) => ({
          role: m.role === 'user' ? 'user' : 'model',
          content: typeof m.content === 'string' ? m.content.slice(0, 2000) : ''
        }))
      : [];

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `You are "DevBot", an expert, friendly AI Coding Tutor and Mentor for the "DevQuest" learning platform.
Your mission is to help students master Python, TypeScript, and Git version control.

Language Directive:
- ALWAYS respond in the user's requested language: ${language.toUpperCase()} (${language === 'it' ? 'Italian' : language === 'es' ? 'Spanish' : 'English'}).

Special Modes:
1. Progressive Hints (Scaffolded Hints):
   - Hint Level 1: Guiding conceptual question without code.
   - Hint Level 2: Point out the key variable, operator, or function involved.
   - Hint Level 3: Show a small code snippet structural pattern without solving the exact problem.

2. Python Memory Behavior Diagram:
   - When asked about memory, scope, or variables, generate an ASCII/Markdown memory layout showing [STACK (Variables/Pointers)] -> [HEAP (Objects/Values)].

Pedagogical Rules:
- Be encouraging, clear, concise, and structured.
- Use markdown formatting with clear code blocks (\`\`\`python, \`\`\`typescript, \`\`\`bash).
- Context provided: ${questionContext ? JSON.stringify(questionContext) : 'General developer learning query'}.
`;

    // Prepare contents array for gemini-3.6-flash
    const formattedPrompt = messages && messages.length > 0
      ? messages.map((m: { role: string; content: string }) => `${m.role === 'user' ? 'User' : 'DevBot'}: ${m.content}`).join('\n')
      : "Hello DevBot, introduce yourself and offer assistance!";

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: formattedPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I couldn't generate a response. Please try again later.";

    return NextResponse.json({ text: reply });
  } catch (error: unknown) {
    console.error("Error calling Gemini API:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "SERVER_ERROR", message: errorMessage },
      { status: 500 }
    );
  }
}
