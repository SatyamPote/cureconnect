import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error("Gemini Service: Error initializing GoogleGenAI client", e);
  }
} else {
  console.warn("Gemini Service: No API_KEY found. AI features will be disabled.");
}

export interface AIAlternativeSuggestion {
  genericName: string;
  reason: string;
  suggestedSearchTerms: string[];
  comparison?: {
    genericVsBranded: string;
    strengthVariation: string;
    saltComposition: string;
  };
}

// Helper to get alternative medicines when stock is low
export const getAlternativeMedicines = async (medicineName: string, genericName: string): Promise<AIAlternativeSuggestion | null> => {
  if (!ai) {
    console.warn("Gemini Service: AI not initialized. Returning null for alternative medicines.");
    return null;
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `The user wants '${medicineName}' (${genericName}) but it is out of stock. Suggest a generic alternative available in India. 
      Also explain the difference between generic and branded, any strength variations, and confirm salt composition.
      Return JSON.`,
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
            },
            comparison: {
              type: Type.OBJECT,
              properties: {
                genericVsBranded: { type: Type.STRING, description: "Explanation of generic vs branded difference for this specific case" },
                strengthVariation: { type: Type.STRING, description: "Note on strength variations if any" },
                saltComposition: { type: Type.STRING, description: "Confirmation of salt composition match" }
              }
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
  if (!ai) {
    console.warn("Gemini Service: AI not initialized. Returning original query.");
    return [userQuery];
  }
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

// Chatbot helper
export const chatWithAIPharmacist = async (history: { role: 'user' | 'model', parts: [{ text: string }] }[], message: string): Promise<string> => {
  if (!ai) {
    return "I'm sorry, I cannot answer right now as my AI brain is not connected (API Key missing).";
  }
  try {
    // Construct the full conversation for a stateless call
    const contents = [
      { role: 'user', parts: [{ text: "You are a helpful AI Pharmacist assistant for CureConnect. You help users find medicines, understand side effects, and suggest alternatives. Keep answers concise and safe. Always advise consulting a doctor for serious issues." }] },
      { role: 'model', parts: [{ text: "Understood. I am ready to help as a safe and concise AI Pharmacist." }] },
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents
    });

    return response.text || "I didn't get a response.";
  } catch (error) {
    console.error("Gemini Chat Error Details:", JSON.stringify(error, null, 2));
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble thinking right now. Please try again later.";
  }
};

// Helper for Prescription Analysis
export const analyzePrescription = async (imageBase64: string): Promise<any> => {
  if (!ai) {
    throw new Error("AI not initialized");
  }
  try {
    // Using standard generateContent with inline data.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: "Analyze this prescription image. Extract the medicines, dosages, and quantities. Return a JSON array of objects with keys: name, dosage, quantity, type (tablet/syrup/etc). Ignore non-medicine text." },
            { inlineData: { mimeType: "image/jpeg", data: imageBase64 } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Prescription Analysis Error:", error);
    return [];
  }
};
