import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = "You are GoGirl — a warm, empathetic AI companion for women in India facing online harassment. You are like a trusted older sister. Never victim-blame. Validate feelings first. Use simple warm English. Be India-culturally aware. Max 200 words per response.";

function getAIClient() {
  const apiKey = import.meta.env.VITE_GEMINI_KEY || 
                 import.meta.env.API_KEY || 
                 process.env.API_KEY || 
                 process.env.GEMINI_API_KEY || 
                 'AIzaSyDy8Wdi6PIXC-17rlz1DC1zKhCkbwsyJhQ'; // User provided fallback
  return new GoogleGenAI({ apiKey });
}

export async function classifyMessage({ message, platform, duration }) {
  const ai = getAIClient();
  try {
    const prompt = `MODE: CLASSIFY
Platform: ${platform}
Duration: ${duration}
Message: ${message}

Respond ONLY in this exact format — no extra text:
SEVERITY: [NOT HARMFUL / MILD / MODERATE / SEVERE]
REASON: [2 warm supportive sentences explaining why]
VALIDATION: [1 sentence validating the user's feelings]`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });

    const text = response.text;
    const severityMatch = text.match(/SEVERITY:\s*(.*)/i);
    const reasonMatch = text.match(/REASON:\s*(.*)/i);
    const validationMatch = text.match(/VALIDATION:\s*(.*)/i);

    if (!severityMatch || !reasonMatch || !validationMatch) {
      return { error: "Failed to parse AI response." };
    }

    return {
      severity: severityMatch[1].trim().toUpperCase(),
      reason: reasonMatch[1].trim(),
      validation: validationMatch[1].trim()
    };
  } catch (error) {
    console.error("classifyMessage error:", error);
    return { error: "Failed to connect to AI service. Please try again." };
  }
}

export async function getActionPlan({ severity, situation }) {
  const ai = getAIClient();
  try {
    const prompt = `MODE: ACTION PLAN
Severity: ${severity}
Situation: ${situation}

Give exactly 3 practical steps for a woman in India.
Each must be specific, actionable, India-relevant.

Respond ONLY in this exact format:
STEP1_TITLE: [short title max 5 words]
STEP1_DESC: [one sentence, specific]
STEP1_RESOURCE: [specific app/website/number if applicable, else NONE]
STEP2_TITLE: [short title max 5 words]
STEP2_DESC: [one sentence, specific]
STEP2_RESOURCE: [specific app/website/number if applicable, else NONE]
STEP3_TITLE: [short title max 5 words]
STEP3_DESC: [one sentence, specific]
STEP3_RESOURCE: [specific app/website/number if applicable, else NONE]`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });

    const text = response.text;
    const steps = [];
    for (let i = 1; i <= 3; i++) {
      const titleMatch = text.match(new RegExp(`STEP${i}_TITLE:\\s*(.*)`, 'i'));
      const descMatch = text.match(new RegExp(`STEP${i}_DESC:\\s*(.*)`, 'i'));
      const resMatch = text.match(new RegExp(`STEP${i}_RESOURCE:\\s*(.*)`, 'i'));
      
      if (titleMatch && descMatch && resMatch) {
        steps.push({
          title: titleMatch[1].trim(),
          desc: descMatch[1].trim(),
          resource: resMatch[1].trim()
        });
      }
    }

    if (steps.length === 0) return { error: "Failed to parse action plan." };
    return steps;
  } catch (error) {
    console.error("getActionPlan error:", error);
    return { error: "Failed to generate action plan." };
  }
}

export async function getSelfCareMessage({ mood }) {
  const ai = getAIClient();
  try {
    const prompt = `MODE: SELF CARE
The user is feeling: ${mood}

Write a short, warm, personal message (3-4 sentences) for a woman in India who is feeling ${mood} after experiencing online harassment.
Then suggest one small, immediate self-care action she can do in the next 5 minutes.

Format:
MESSAGE: [3-4 sentences]
ACTION: [one small immediate action]`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });

    const text = response.text;
    const msgMatch = text.match(/MESSAGE:\s*([\s\S]*?)ACTION:/i);
    const actMatch = text.match(/ACTION:\s*([\s\S]*)/i);

    if (!msgMatch || !actMatch) return { error: "Failed to parse self-care message." };

    return {
      message: msgMatch[1].trim(),
      action: actMatch[1].trim()
    };
  } catch (error) {
    console.error("getSelfCareMessage error:", error);
    return { error: "Failed to generate self-care message." };
  }
}

export async function getReportingSteps({ platform }) {
  const ai = getAIClient();
  try {
    const prompt = `MODE: REPORT STEPS
Platform: ${platform}

Give exact step-by-step instructions for reporting harassment on ${platform} in India in 2024.
Include any India-specific legal reporting options.

Format:
STEP1: [exact instruction]
STEP2: [exact instruction]
STEP3: [exact instruction]
(up to 6 steps)`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });

    const text = response.text;
    const steps = [];
    const lines = text.split('\n');
    for (const line of lines) {
      const match = line.match(/^STEP\d+:\s*(.*)/i);
      if (match) {
        steps.push(match[1].trim());
      }
    }

    if (steps.length === 0) return { error: "Failed to parse reporting steps." };
    return steps;
  } catch (error) {
    console.error("getReportingSteps error:", error);
    return { error: "Failed to generate reporting steps." };
  }
}
