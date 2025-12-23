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
    if (import.meta.env?.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
    // Node/Process fallback
    if (typeof process !== "undefined" && process.env?.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore environment access errors
  }
  return "PENDING_KEY";
};

// 2. Schemas (RESTORED FULL DETAIL - THE SOUL)
const deepSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    prologue: { type: Type.STRING, description: "前言断语 (Opening Judgment). A profound opening. State the user's 'Factory Settings' (Limitations) clearly but with empathy." },
    imageryDetail: {
      type: Type.OBJECT,
      properties: {
        literal: { type: Type.STRING, description: "字面含义" },
        energy: { type: Type.STRING, description: "五行能量" },
        metaphor: { type: Type.STRING, description: "玄学隐喻" }
      },
      required: ["literal", "energy", "metaphor"]
    },
    personalityDetail: {
      type: Type.OBJECT,
      properties: {
        selfPerception: { type: Type.STRING, description: "自我认知" },
        socialStrategy: { type: Type.STRING, description: "社交策略" },
        mindset: { type: Type.STRING, description: "深层心态" }
      },
      required: ["selfPerception", "socialStrategy", "mindset"]
    },
    fortuneDetail: {
      type: Type.OBJECT,
      properties: {
        wealth: { type: Type.STRING, description: "财运" },
        relationships: { type: Type.STRING, description: "情感" },
        hiddenWorries: { type: Type.STRING, description: "隐忧" }
      },
      required: ["wealth", "relationships", "hiddenWorries"]
    },
    // NEW: Timeline Decision Nodes
    timeline: {
        type: Type.ARRAY,
        description: "Future Decision Nodes. PREDICT EXACTLY 3 YEARS (e.g., 2025, 2026, 2027). Focus on CHOICES.",
        items: {
            type: Type.OBJECT,
            properties: {
                year: { type: Type.STRING, description: "e.g., 2025 (Snake Year)" },
                title: { type: Type.STRING, description: "Short title of the conflict (e.g., 'Stability vs Breakthrough')" },
                choice: { type: Type.STRING, description: "Description of the choice the user must make to ascend." }
            }
        }
    },
    // NEW: Energy Totem
    energyTotem: {
        type: Type.OBJECT,
        description: "A specific Kanji/Symbol to act as a psychological anchor for change.",
        properties: {
            kanji: { type: Type.STRING, description: "Single Kanji (e.g., '定', '破', '润')" },
            meaning: { type: Type.STRING, description: "Why this totem helps them break their specific cycle." }
        }
    },
    summary: { type: Type.STRING, description: "A poetic summary. Emphasize the spiral ascension: limitation is the foundation of freedom." },
    advice: { type: Type.STRING, description: "Actionable advice. How to use the Energy Totem in daily life." },
    finalQuestion: { type: Type.STRING, description: "Ultimate Question." },
    goldValue: { type: Type.INTEGER, description: "Social Currency (1-1000)." },
    dailyMantra: { type: Type.STRING, description: "Daily Mantra." },
    visualPrompt: { type: Type.STRING, description: "English prompt for ink-wash painting." }
  },
  required: ["prologue", "imageryDetail", "personalityDetail", "fortuneDetail", "summary", "advice", "finalQuestion", "goldValue", "dailyMantra", "visualPrompt", "timeline", "energyTotem"]
};

// Schema for the Standard modes (Sage, Psychologist, Mentor)
const standardSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    prologue: { type: Type.STRING, description: "前言断语" },
    imagery: { type: Type.STRING, description: "Layer 1" },
    energy: { type: Type.STRING, description: "Layer 2" },
    psychology: { type: Type.STRING, description: "Layer 3" },
    sociology: { type: Type.STRING, description: "Layer 4" },
    summary: { type: Type.STRING, description: "Summary" },
    advice: { type: Type.STRING, description: "Advice" },
    finalQuestion: { type: Type.STRING, description: "Ultimate Question" },
    goldValue: { type: Type.INTEGER, description: "Value" },
    dailyMantra: { type: Type.STRING, description: "Mantra" },
    visualPrompt: { type: Type.STRING, description: "Image Prompt" }
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
  // Moving this inside the function fixes the crash on load issue.
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

  // 3. RESTORED FULL PROMPTS - THE SOUL
  if (isDeepMode) {
    systemInstruction = `
        You are "Nomen (名·相)". You are not just a fortune teller, you are a "Ferryman" of souls (摆渡人).
        
        **Core Philosophy:**
        1. **Cognition (认命):** Clearly state their limitations and "factory settings" based on their name.
        2. **Dialectic (辩证):** Explain how these limitations are actually their unique weapons if used correctly.
        3. **Ascension (改命):** Provide choices, not fixed futures. Life is a Spiral Ascension.

        **Output Structure:**
        1. **Prologue:** Profound judgment of their current state.
        2. **Deep Analysis:** Deconstruct Imagery, Personality, and Fortune.
        3. **Timeline (流年抉择):** Predict exactly 3 future decision nodes (years) where they must choose between "Cycle" (staying the same) and "Ascension" (growing).
        4. **Energy Totem (能量图腾):** Give them ONE character/symbol to focus on to break their specific deadlock.
        5. **Social Currency & Mantra:** Viral elements.
        6. **Ultimate Question:** A soul-searching question.
        
        Language: Chinese (Simplified).
        Style: Insightful, empathetic but sharp, philosophical.
    `;
  } else {
    // Legacy instructions for other personas
    const baseInstruction = `
      You are "Nomen (名·相)", an AI expert combining Semiotics, Jungian Psychology, Sociology, and Five Elements.
      Structure:
      1. Prologue
      2. 4 Layers: Imagery, Energy, Psychology, Sociology.
      3. Social Currency & Mantra.
      4. Ultimate Question.

      Language: Chinese (Simplified).
    `;

    switch (input.persona) {
      case 'sage':
        systemInstruction = `${baseInstruction} Tone: Ancient Sage (隐世高人).`;
        break;
      case 'psychologist':
        systemInstruction = `${baseInstruction} Tone: Jungian Analyst (心理咨询师).`;
        break;
      case 'mentor':
        systemInstruction = `${baseInstruction} Tone: Ruthless Career Mentor (毒舌职场导师).`;
        break;
      default:
        systemInstruction = baseInstruction;
    }
  }

  // 4. Generate Content (Using gemini-3-flash-preview for better instruction following)
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

      // 5. Generate Image (Optional)
      try {
        const imageResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: result.visualPrompt + " style of Neo-Oriental Cyberpunk, spiral composition, golden ratio, ink wash painting, ethereal, minimal, masterpiece, 8k" }]
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