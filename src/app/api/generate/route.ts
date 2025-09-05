// src/app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    // Validation
    if (!idea || typeof idea !== 'string') {
      return NextResponse.json({ error: "Valid idea string is required" }, { status: 400 });
    }

    const trimmedIdea = idea.trim();
    if (trimmedIdea.length < 5) {
      return NextResponse.json({ error: "Idea must be at least 5 characters long" }, { status: 400 });
    }

    // OpenRouter API call with enhanced prompt
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "QuickPitch AI",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
  {
    role: "system",
    content: `You are an expert VC pitch deck writer. Produce a professional 10-page pitch deck. IMPORTANT RULES:
1) Do NOT use Markdown notation. Do NOT use asterisks (*), backticks (\`), bullet glyphs (•), or any decorative characters.
2) Output must be plain UTF-8 text only, with clear page headers like "PAGE 1: COVER SLIDE".
3) Separate pages with exactly TWO newline characters (\\n\\n) between pages.
4) Each page must include the exact subheadings shown below and content in full sentences (no lists with bullet glyphs). If a list is required, write numbered sentences (1., 2., 3.).
5) Use realistic but conservative numbers when estimating TAM/SAM/SOM and metrics; indicate when numbers are hypothetical.
6) Keep tone formal and investor-ready. No emojis, no casual language.
7) Keep the output concise but thorough (about 8–12 sentences per page).`
  },
  {
    role: "user",
    content: `Create a complete VC pitch deck for the idea: "${trimmedIdea}". 
Follow these pages exactly (use the headings shown):

PAGE 1: COVER SLIDE
- Company Name
- Tagline
- Logo description

PAGE 2: PROBLEM STATEMENT
- The Problem
- Market Pain
- Current Solutions

PAGE 3: SOLUTION
- Our Solution
- Key Features (write as numbered sentences)
- How it Works

PAGE 4: MARKET OPPORTUNITY
- TAM/SAM/SOM (provide numbers and brief assumptions)
- Target Customers
- Market Trends

PAGE 5: BUSINESS MODEL
- Revenue Streams
- Pricing Strategy
- Sales Channels

PAGE 6: COMPETITIVE LANDSCAPE
- Competitors
- Our Advantages
- Differentiation

PAGE 7: TRACTION & MILESTONES
- Current Progress
- Key Metrics (numbers)
- Future Milestones

PAGE 8: TEAM
- Founding Team (short bios)
- Advisors (if any)
- Hiring Plan

PAGE 9: FUNDING ASK
- Amount Needed
- Use of Funds (percent breakdown)
- Timeline

PAGE 10: CONTACT
- Contact Information
- Website
- Social Media (if any)

Remember: plain text only, no Markdown, no asterisks, no decorative characters. Separate pages with exactly two newlines.`
  }
],

        max_tokens: 2000,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to generate pitch");
    }

    const data = await response.json();
    const pitch = data.choices[0]?.message?.content?.trim() || "";

    if (!pitch) {
      throw new Error("Empty response from OpenRouter");
    }

    return NextResponse.json({ pitch });

  } catch (error: any) {
    console.error("Generation Error:", error);
    
    // Enhanced fallback with proper structure
    const mockPitch = `PAGE 1: COVER SLIDE
Company Name: ${idea.split(' ')[0]}Tech Solutions
Tagline: "Revolutionizing the future of innovation"
Logo: Modern abstract design representing connectivity and growth

PAGE 2: PROBLEM STATEMENT
The Problem: Businesses struggle with inefficient processes and outdated technology
Market Pain: Companies lose an average of $2.3M annually due to operational inefficiencies
Current Solutions: Existing tools are fragmented, expensive, and lack integration capabilities

PAGE 3: SOLUTION
Our Solution: A comprehensive platform that streamlines operations through AI-powered automation
Key Features: 
- Real-time analytics dashboard
- Automated workflow management
- Seamless third-party integrations
- Customizable reporting tools
How it Works: Cloud-based SaaS platform accessible from any device

PAGE 4: MARKET OPPORTUNITY
TAM: $85B global market for operational efficiency solutions
SAM: $22B addressable market in our target regions
SOM: $5.2B serviceable market in year 1
Target Customers: Mid-market companies (100-1000 employees) in technology and services sectors
Market Trends: 40% YoY growth in automation software adoption

PAGE 5: BUSINESS MODEL
Revenue Streams: Monthly subscriptions, enterprise licensing, professional services
Pricing Strategy: Tiered pricing from $99/month to $999/month for enterprise
Sales Channels: Direct sales, partner channels, and self-service onboarding

PAGE 6: COMPETITIVE LANDSCAPE
Competitors: Established players with outdated technology and poor user experience
Our Advantages: Modern architecture, better integration capabilities, superior UX
Differentiation: 3x faster implementation and 40% lower total cost of ownership

PAGE 7: TRACTION & MILESTONES
Current Progress: MVP developed, 15 pilot customers, 92% customer satisfaction
Key Metrics: 45% month-over-month growth, $120K ARR, 85% retention rate
Future Milestones: Expand to 3 new markets, reach 100+ customers, launch mobile app

PAGE 8: TEAM
Founding Team: Experienced entrepreneurs with 15+ years in technology and business
Advisors: Industry experts from leading tech companies
Hiring Plan: Expand engineering and sales teams with 10 new hires

PAGE 9: FUNDING ASK
Amount Needed: $2M seed round
Use of Funds: 
- 40% Product development
- 30% Sales and marketing
- 20% Team expansion
- 10% Operational costs
Timeline: Achieve profitability within 24 months, 10x growth in 36 months

PAGE 10: CONTACT
Contact Information: hello@company.com | (555) 123-4567
Website: www.company.com
Social Media: @companytech on Twitter and LinkedIn`;

    return NextResponse.json({ pitch: mockPitch });
  }
}