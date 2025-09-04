import { GoogleGenAI, Type } from "@google/genai";
import type { Sentiment } from '../types';

// This check is no longer needed as we assume process.env.API_KEY is provided
// in the execution environment for a live application.
// if (!process.env.API_KEY) {
//   throw new Error("API_KEY environment variable not set");
// }

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const geminiModel = ai.models;

export const analyzeReviewSentiment = async (reviewText: string): Promise<{ sentiment: Sentiment; themes: string[] }> => {
  try {
    const response = await geminiModel.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the sentiment of the following Google Business Profile review. Categorize it as 'Positive', 'Neutral', or 'Negative'. Also, identify up to 3 key themes or topics mentioned (e.g., 'customer service', 'product quality', 'pricing'). Review: "${reviewText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING, description: "The sentiment of the review, either 'Positive', 'Neutral', or 'Negative'." },
            themes: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Up to 3 key themes mentioned in the review." },
          },
          required: ["sentiment", "themes"],
        },
      },
    });

    const parsed = JSON.parse(response.text);
    if (['Positive', 'Neutral', 'Negative'].includes(parsed.sentiment)) {
        return parsed;
    }
    return { sentiment: 'Neutral', themes: parsed.themes || [] };
  } catch (error) {
    console.error("Error analyzing review sentiment:", error);
    return { sentiment: 'Neutral', themes: [] };
  }
};

export const generateReviewReply = async (businessName: string, reviewText: string): Promise<string> => {
  try {
    const response = await geminiModel.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a friendly and professional business manager for "${businessName}". Write a thoughtful reply to the following customer review. If it's positive, thank them. If it's negative, apologize and offer to make things right. Keep the reply concise. Review: "${reviewText}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating review reply:", error);
    return "We appreciate your feedback and will look into this.";
  }
};


export const generateGmbPost = async (businessName: string, businessType: string, topic: string): Promise<string> => {
  try {
    const response = await geminiModel.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a social media manager for "${businessName}", a ${businessType}. Create an engaging Google Business Profile post about "${topic}". Include a clear call to action. Do not use hashtags.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating GMB post:", error);
    return "Come visit us today for our latest offers!";
  }
};

export const suggestKeywords = async (businessType: string, location: string): Promise<string[]> => {
    try {
        const response = await geminiModel.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate 10 relevant local SEO keywords for a ${businessType} in ${location}. Include a mix of high-intent and informational keywords.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 10 local SEO keywords." },
            },
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error suggesting keywords:", error);
        return ["local business", "services in town", "best local provider"];
    }
};

export const generateQnaAnswer = async (businessName: string, question: string): Promise<string> => {
    try {
        const response = await geminiModel.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are the manager of "${businessName}". Provide a helpful and direct answer to the following customer question. Question: "${question}"`,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating Q&A answer:", error);
        return "Please contact us directly for more information on this matter.";
    }
};

export const generateAIVisibilityExample = async (businessName: string, businessType: string, location: string): Promise<string> => {
    try {
        const response = await geminiModel.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a plausible, positive mention of a business named "${businessName}", a ${businessType}, in an AI search result for a user in ${location}. The mention should sound natural and helpful.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating AI visibility example:", error);
        return `For a great ${businessType} in ${location}, consider checking out ${businessName}.`;
    }
};
