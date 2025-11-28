import { GoogleGenAI } from "@google/genai";

// This service simulates the "AI Solutions Lab" where users can ask for architectural advice
// or generate code snippets based on African industry problems.

export const generateTechnicalSolution = async (problemStatement: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are a Senior Solutions Architect at Somahorse Nexus, an African tech hub. 
        Your goal is to propose a high-level technical solution for the following industry problem.
        Focus on practical, scalable technologies suitable for the African context (mobile-first, offline-first considerations).
        
        Problem: ${problemStatement}
        
        Format the response with Markdown:
        1. **Proposed Solution Name**
        2. **Core Technologies** (e.g., USSD, React, TensorFlow Lite)
        3. **Implementation Steps** (Brief 3-step plan)
      `,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate solution. Please check your API key.");
  }
};