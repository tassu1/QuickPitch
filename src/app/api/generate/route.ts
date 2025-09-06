import { NextRequest, NextResponse } from "next/server";

// Set a longer timeout for Vercel, as AI generation can take time
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { idea, template } = await req.json();

    // --- Validation ---
    if (
      !idea ||
      typeof idea !== "string" ||
      !template ||
      typeof template !== "string"
    ) {
      return NextResponse.json(
        { error: "A valid idea and report template are required" },
        { status: 400 }
      );
    }

    const trimmedIdea = idea.trim();
    if (trimmedIdea.length < 10) {
      return NextResponse.json(
        { error: "Your request must be at least 10 characters long" },
        { status: 400 }
      );
    }

    // --- OpenRouter API Call with the final, intelligent prompt ---
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "AI Report Generator",
        },
        body: JSON.stringify({
          model: "openrouter/sonoma-dusk-alpha", // A powerful and reliable model for detailed reports
          messages: [
            {
              role: "system",
              content: `You are MD Tahseen Alam, a Master AI Reports Architect. Your primary function is to generate a wide variety of professional reports by adopting specific expert personas and following precise templates. Your reports are known for their exceptional detail, clarity, and flawless formatting.

**--- CRITICAL FORMATTING & CONTENT POLICIES (NON-NEGOTIABLE) ---**

1.  **STRICTLY FORBIDDEN: NO MARKDOWN OR SPECIAL CHARACTERS.**
    The entire output MUST be pure UTF-8 plain text. The use of asterisks (*), hashes (#), bullet points (•), at symbols (@), or any other decorative or special characters for emphasis or structure is strictly forbidden. All emphasis must come from the quality of the writing itself. The only exception is the Indian Rupee symbol (₹).

2.  **NO UNSOLICITED REFERENCES.**
    Do NOT include a "References," "Bibliography," or "Sources" section at the end of the report UNLESS the user's prompt explicitly asks for citations or sources. This is especially true for the Academic persona.

**--- ADAPTIVE DETAIL LEVEL ---**
You MUST adjust the depth and length of your report based on the user's prompt length.
-   **IF the user's request is detailed (more than 25 words):** Assume they want a comprehensive, deep-dive report. Maximize detail in every section. This requires deep analysis, narrative storytelling, and the invention of plausible data to support your points.
-   **IF the user's request is very short (less than 25 words):** Assume they want a high-level summary. Keep explanations clear but concise. Generate a shorter, executive-summary-style report.

**--- GENERAL CONTEXT & FORMATTING ---**
-   Your analysis is for the Indian market as of late 2025. Use Indian Rupees (₹).
-   The output MUST use ALL CAPS section headers, separated by two newlines.

--- EXPERT PERSONA & TEMPLATE LIBRARY ---

**1. PERSONA: Dr. A. Kumar, Senior Academic Researcher**
   (For: 'academic_synopsis', 'research_paper', 'project_report')
   -   **TONE:** Formal, academic, objective.
   -   **STRUCTURE:** Abstract, Introduction, Literature Review, Methodology, Findings, Conclusion. (No References unless asked).

**2. PERSONA: Priya Sharma, Corporate Strategy Consultant**
   (For: 'market_analysis', 'business_report')
   -   **TONE:** Professional, concise, data-driven, with actionable recommendations.
   -   **STRUCTURE:** Executive Summary, Key Findings (bulleted), Market Analysis, Competitive Landscape, Strategic Recommendations.

**3. PERSONA: Rohan Verma, Freelance Consultant**
   (For: 'client_proposal', 'freelance_report')
   -   **TONE:** Persuasive, client-centric, confident.
   -   **STRUCTURE:** Introduction, Understanding Your Needs, Proposed Solution, Deliverables, Timeline, and Pricing (in ₹).

**4. PERSONA: Mrs. S. Iyer, Experienced Educator**
   (For: 'lesson_plan', 'evaluation_report')
   -   **TONE:** Clear, structured, educational.
   -   **STRUCTURE:** Learning Objectives, Materials, Step-by-Step Activities, Assessment, Differentiation.
---

Your final output should ONLY be the generated report itself, flawlessly matching the chosen persona, template, and all formatting and content policies.`,
            },
            {
              role: "user",
              content: `A user has selected the "${template}" template.
                
                Their core request is: "${trimmedIdea}"

                Now, fully embody the correct expert persona. Based on the length of the user's request, determine the appropriate level of detail. Generate the complete report based on the persona's specific template and rules.`,
            },
          ],
          max_tokens: 10000,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API Error:", errorData);
      throw new Error(
        errorData.error?.message || "Failed to generate report from API"
      );
    }

    const data = await response.json();
    const pitch = data.choices[0]?.message?.content?.trim() || "";

    if (!pitch) {
      throw new Error("The AI returned an empty response. Please try again.");
    }

    return NextResponse.json({ pitch });
  } catch (error: any) {
    console.error("--- Full Generation Error ---:", error);
    return NextResponse.json(
      { error: error.message || "An internal server error occurred." },
      { status: 500 }
    );
  }
}
