import { GoogleGenerativeAI } from "@google/generative-ai";

// This service simulates the "AI Solutions Lab" where users can ask for architectural advice
// or generate code snippets based on African industry problems.

export const generateTechnicalSolution = async (problemStatement: string): Promise<string> => {
  // In Vite, env vars should be accessed via import.meta.env at runtime.
  // We keep a loose type here to avoid needing a global declaration in this file.
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined;

  if (!apiKey) {
    console.error("Gemini API Error: Missing API key (VITE_GEMINI_API_KEY).");
    throw new Error("Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your Vite env.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const prompt = `
You are a Senior Solutions Architect at Somahorse Nexus, an African tech hub. 
Your goal is to propose a high-level technical solution for the following industry problem.
Focus on practical, scalable technologies suitable for the African context (mobile-first, offline-first considerations).

Problem: ${problemStatement}

Format the response with Markdown:
1. **Proposed Solution Name**
2. **Core Technologies** (e.g., USSD, React, TensorFlow Lite)
3. **Implementation Steps** (Brief 3-step plan)
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return responseText || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate solution. Please check your API key and network connection.");
  }
};