import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, UserInput } from "../types";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Schema for the "Deep/Colloquial" mode - Updated for Spiral Philosophy
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

export const analyzeName = async (input: UserInput): Promise<AnalysisResult> => {
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

  // 1. Generate Text Analysis
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
  if (!textResultString) throw new Error("Failed to generate analysis");
  
  const rawData = JSON.parse(textResultString);

  // Construct the correct result object based on mode
  let result: AnalysisResult;

  if (isDeepMode) {
    result = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        userInput: input,
        mode: 'deep',
        ...rawData
    } as AnalysisResult;
  } else {
    result = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        userInput: input,
        mode: 'standard',
        ...rawData
    } as AnalysisResult;
  }

  // 2. Generate Image
  try {
    const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [{ text: result.visualPrompt + " style of Neo-Oriental Cyberpunk, spiral composition, golden ratio, ink wash painting, ethereal, minimal, masterpiece, 8k" }]
        },
        config: {
            imageConfig: { aspectRatio: "1:1" }
        }
    });

    if (imageResponse.candidates && imageResponse.candidates[0].content.parts) {
        for (const part of imageResponse.candidates[0].content.parts) {
            if (part.inlineData) {
                result.imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                break;
            }
        }
    }
  } catch (error) {
    console.error("Image generation failed", error);
  }

  return result;
};