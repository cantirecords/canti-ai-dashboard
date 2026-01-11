
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateExpertResponse = async (prompt: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
      config: {
        systemInstruction: `You are a CANTI AI Expert. Your job is to help business owners manage their dashboard and leads. Context: ${context}`,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to the CANTI servers right now. Please try again later.";
  }
};

export const generateCustomerReply = async (customerMessage: string, businessContext: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: customerMessage,
      config: {
        systemInstruction: `You are a helpful AI assistant for a local service business. Use this business context: ${businessContext}. Keep replies short, professional, and friendly. Answer in the same language the customer uses.`,
      }
    });
    return response.text;
  } catch (error) {
    return "I will check that for you right away.";
  }
};
