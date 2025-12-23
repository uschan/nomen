import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, UserInput } from "../types";

// --- Configuration ---

// 1. Safe Key Retrieval:
// We use a dummy key "PENDING_KEY" if the real one is missing. 
// This PREVENTS the "An API Key must be set" error from crashing the app on startup.
// The app will load, and only fail when the user actually clicks the button.
const getApiKey = (): string => {
  try {
    // @ts-ignore: Vite standard
    const key = import.meta.env?.VITE_API_KEY;
    if (key && typeof key === 'string' && key.length > 0) {
      return key;
    }
  } catch (e) {
    // Ignore environment access errors
  }
  return "PENDING_KEY";
};

// 2. Schemas (No changes in logic, just moved down to keep file clean)
const deepSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    prologue: { type: Type.STRING, description: "前言断语" },
    imageryDetail: {
      type: Type.OBJECT,
      properties: {
        literal: { type: Type.STRING },
        energy: { type: Type.STRING },
        metaphor: { type: Type.STRING }
      },
      required: ["literal", "energy", "metaphor"]
    },
    personalityDetail: {
      type: Type.OBJECT,
      properties: {
        selfPerception: { type: Type.STRING },
        socialStrategy: { type: Type.STRING },
        mindset: { type: Type.STRING }
      },
      required: ["selfPerception", "socialStrategy", "mindset"]
    },
    fortuneDetail: {
      type: Type.OBJECT,
      properties: {
        wealth: { type: Type.STRING },
        relationships: { type: Type.STRING },
        hiddenWorries: { type: Type.STRING }
      },
      required: ["wealth", "relationships", "hiddenWorries"]
    },
    timeline: {
        type: Type.ARRAY,
        description: "3 Years Prediction",
        items: {
            type: Type.OBJECT,
            properties: {
                year: { type: Type.STRING },
                title: { type: Type.STRING },
                choice: { type: Type.STRING }
            }
        }
    },
    energyTotem: {
        type: Type.OBJECT,
        properties: {
            kanji: { type: Type.STRING },
            meaning: { type: Type.STRING }
        }
    },
    summary: { type: Type.STRING },
    advice: { type: Type.STRING },
    finalQuestion: { type: Type.STRING },
    goldValue: { type: Type.INTEGER },
    dailyMantra: { type: Type.STRING },
    visualPrompt: { type: Type.STRING }
  },
  required: ["prologue", "imageryDetail", "personalityDetail", "fortuneDetail", "summary", "advice", "finalQuestion", "goldValue", "dailyMantra", "visualPrompt", "timeline", "energyTotem"]
};

const standardSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    prologue: { type: Type.STRING },
    imagery: { type: Type.STRING },
    energy: { type: Type.STRING },
    psychology: { type: Type.STRING },
    sociology: { type: Type.STRING },
    summary: { type: Type.STRING },
    advice: { type: Type.STRING },
    finalQuestion: { type: Type.STRING },
    goldValue: { type: Type.INTEGER },
    dailyMantra: { type: Type.STRING },
    visualPrompt: { type: Type.STRING }
  },
  required: ["prologue", "imagery", "energy", "psychology", "sociology", "summary", "advice", "finalQuestion", "goldValue", "dailyMantra", "visualPrompt"]
};

// --- Main Function ---

export const analyzeName = async (input: UserInput): Promise<AnalysisResult> => {
  const currentKey = getApiKey();

  // 1. Runtime Validation: Throw error inside the UI flow, not global crash
  if (currentKey === "PENDING_KEY") {
    throw new Error("API Key 未配置。请在 .env 文件中设置 VITE_API_KEY。");
  }

  // 2. Initialize Instance (Safe now because key is definitely not empty)
  const ai = new GoogleGenAI({ apiKey: currentKey });

  const isDeepMode = input.persona === 'colloquial';
  
  const prompt = `
    Analyze this user:
    Name: ${input.name}
    Occupation: ${input.occupation}
    Background: ${input.background || 'Not specified'}
    Location: ${input.location}
  `;

  let systemInstruction = "";

  if (isDeepMode) {
    systemInstruction = `
        You are "Nomen (名·相)". Ferryman of souls.
        Philosophy: Cognition (Limitation), Dialectic (Weapon), Ascension (Choice).
        Output: JSON.
        Language: Chinese (Simplified).
    `;
  } else {
    systemInstruction = `You are Nomen. Expert in Semiotics. Output: JSON. Language: Chinese.`;
  }

  // 3. Generate Content
  try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: isDeepMode ? deepSchema : standardSchema
        }
      });

      const textResultString = response.text;
      if (!textResultString) throw new Error("API 返回为空");
      
      const rawData = JSON.parse(textResultString);
      
      let result: AnalysisResult = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            userInput: input,
            mode: isDeepMode ? 'deep' : 'standard',
            ...rawData
      } as AnalysisResult;

      // 4. Generate Image (Optional)
      try {
        const imageResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: result.visualPrompt + " ink wash painting style, minimal, masterpiece" }]
            },
            config: { imageConfig: { aspectRatio: "1:1" } }
        });

        if (imageResponse.candidates?.[0]?.content?.parts) {
            for (const part of imageResponse.candidates[0].content.parts) {
                if (part.inlineData) {
                    result.imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                    break;
                }
            }
        }
      } catch (imgError) {
        console.warn("Image generation skipped", imgError);
      }

      return result;

  } catch (error: any) {
      console.error("Gemini API Error:", error);
      // Pass the actual error message to the UI
      throw new Error(error.message || "推演过程中断");
  }
};