import { GoogleGenAI, Type } from "@google/genai";
import { Quest } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateAIQuests = async (theme: string, count: number = 3): Promise<Partial<Quest>[]> => {
  if (!ai) {
    console.warn("API Key not found. Returning mock data.");
    return mockQuests;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate ${count} engaging fan quests for the 'Mom3ntum' platform. 
      The theme is: "${theme}".
      Target audience: Music fans, Sports fans, Gamers.
      Tasks should involve social media, streaming, attending events, or community interaction.
      NO crypto, NO tokens, NO financial advice.
      Quests should be short, actionable, and fun.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              rewardXp: { type: Type.INTEGER },
              rewardPoints: { type: Type.INTEGER },
              total: { type: Type.INTEGER, description: "Total count required to complete, e.g. 1, 5, 10" }
            },
            required: ["title", "description", "rewardXp", "rewardPoints", "total"]
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data.map((q: any, index: number) => ({
        ...q,
        id: `ai-${Date.now()}-${index}`,
        type: 'ai-generated',
        completed: false,
        progress: 0
      }));
    }
    return mockQuests;

  } catch (error) {
    console.error("Failed to generate quests:", error);
    return mockQuests;
  }
};

const mockQuests: Partial<Quest>[] = [
  {
    title: "Stream Team",
    description: "Listen to the new album on Spotify for 30 minutes.",
    rewardXp: 150,
    rewardPoints: 50,
    total: 30
  },
  {
    title: "Super Fan",
    description: "Comment on the latest Instagram post with your favorite lyric.",
    rewardXp: 100,
    rewardPoints: 25,
    total: 1
  }
];
