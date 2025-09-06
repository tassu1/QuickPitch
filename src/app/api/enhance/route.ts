// src/app/api/enhance/route.ts
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 20;

export async function POST(req: NextRequest) {
  try {
    const { idea, template } = await req.json();

    if (!idea || !template) {
      return NextResponse.json({ error: "Idea and template are required" }, { status: 400 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "AI Report Enhancer",
      },
      body: JSON.stringify({
        model: "openrouter/sonoma-dusk-alpha",
        messages: [
          {
            role: "system",
            content: `You are an expert Prompt Engineer named "Co-Pilot". A user has provided a simple idea for a specific report template. Your task is to rewrite and expand this idea into a rich, detailed, high-quality prompt that will produce the best possible result from another AI report generator.

            **INSTRUCTIONS:**
            1.  **Analyze the Template:** Understand the goal of the selected template ('${template.title}').
            2.  **Incorporate User's Idea:** Weave the user's core idea ("${idea}") into the structure.
            3.  **Add Detail & Structure:** Add specific, professional language and structure that the report-generating AI will understand. For a 'market_analysis', add phrases like "focusing on the target audience of...", "analyzing key competitors like...". For an 'academic_synopsis', add "The primary research question is...".
            4.  **Return ONLY the new prompt:** Your entire response should be just the enhanced prompt text, and nothing else. Do not add any conversational text.
            5.  **Keep it concise:** The final prompt should be a dense, powerful paragraph, not a full page.
            `
          },
          {
            role: "user",
            content: `Enhance this idea for a "${template.title}" report: "${idea}"`
          }
        ],
        max_tokens: 500,
        temperature: 0.6,
      })
    });

    if (!response.ok) {
        throw new Error("Failed to get response from AI enhancer.");
    }

    const data = await response.json();
    const enhancedPrompt = data.choices[0]?.message?.content?.trim() || "";

    return NextResponse.json({ enhancedPrompt });

  } catch (error: any) {
    console.error("Enhance API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}