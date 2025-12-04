import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize the client conditionally to avoid errors during build/test if env is missing
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateAdvice = async (
  prompt: string,
  systemInstruction: string
): Promise<string> => {
  if (!ai) {
    return "API 키가 설정되지 않았습니다. 개발 환경을 확인해주세요.";
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        // Fixed: Removed maxOutputTokens to avoid empty responses if thinking consumes tokens
        // maxOutputTokens: 500,
      },
    });

    return response.text || "죄송합니다. 답변을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 서비스 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};