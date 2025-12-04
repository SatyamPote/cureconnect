import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AIAlternativeSuggestion {
  genericName: string;
  reason: string;
  suggestedSearchTerms: string[];
}

// Helper to get alternative medicines when stock is low
export const getAlternativeMedicines = async (medicineName: string, genericName: string): Promise<AIAlternativeSuggestion | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `The user wants '${medicineName}' (${genericName}) but it is out of stock. Suggest a generic alternative available in India. Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            genericName: { type: Type.STRING, description: "The generic chemical name of the alternative" },
            reason: { type: Type.STRING, description: "Why this is a good alternative (brief)" },
            suggestedSearchTerms: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of common brand names or search terms for this alternative" 
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIAlternativeSuggestion;
    }
    return null;
  } catch (error) {
    console.error("Gemini Alternative Error:", error);
    return null;
  }
};

// Helper for "Smart Search" - interpreting symptoms or messy queries
export const interpretSearchQuery = async (userQuery: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User search: "${userQuery}". Map this to a list of potential medicine generic names or specific categories. Example: "headache" -> ["Paracetamol", "Ibuprofen", "Aspirin"]. Return JSON array of strings only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as string[];
    }
    return [userQuery];
  } catch (error) {
    console.error("Gemini Search Interpret Error:", error);
    return [userQuery];
  }
};
