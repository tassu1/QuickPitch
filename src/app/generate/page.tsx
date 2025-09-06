"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

// --- Types & Data ---
interface TemplateField {
  id: string;
  label: string;
  placeholder: string;
  type: "input" | "textarea";
}
interface Template {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: TemplateField[];
}

const templates: Template[] = [
  {
    id: "business_pitch",
    title: "Business Pitch Report",
    description: "For investors & partners.",
    icon: "📊",
    fields: [
      {
        id: "idea",
        label: "Business Idea",
        placeholder: "e.g., AI-powered tutor for college students",
        type: "input",
      },
      {
        id: "target_market",
        label: "Target Market",
        placeholder: "e.g., College students in India aged 18-25",
        type: "input",
      },
      {
        id: "differentiator",
        label: "Key Differentiator (Optional)",
        placeholder: "What makes your solution unique?",
        type: "textarea",
      },
    ],
  },
  {
    id: "academic_synopsis",
    title: "Academic Synopsis",
    description: "For students & researchers.",
    icon: "🎓",
    fields: [
      {
        id: "topic",
        label: "Primary Research Topic",
        placeholder: "e.g., The Socio-Economic Impact of 5G in Rural Rajasthan",
        type: "input",
      },
      {
        id: "objective",
        label: "Key Objectives & Research Questions",
        placeholder: "What are the main questions you want to answer?",
        type: "textarea",
      },
      {
        id: "methodology",
        label: "Proposed Methodology (Optional)",
        placeholder: "e.g., Quantitative surveys, qualitative interviews",
        type: "input",
      },
    ],
  },
  {
    id: "market_analysis",
    title: "Market Analysis",
    description: "For corporate teams & startups.",
    icon: "📈",
    fields: [
      {
        id: "product",
        label: "Product or Company to Analyze",
        placeholder: "e.g., A new D2C brand for artisanal cheese in India",
        type: "input",
      },
      {
        id: "audience",
        label: "Primary Target Audience",
        placeholder: "e.g., Urban millennials in Tier-1 cities, aged 25-40",
        type: "textarea",
      },
      {
        id: "competitors",
        label: "Key Competitors (Optional)",
        placeholder: "e.g., Amul, local dairies, other D2C brands",
        type: "input",
      },
      {
        id: "goal",
        label: "Primary Goal of this Report",
        placeholder:
          "e.g., To assess market viability and find a niche entry point",
        type: "input",
      },
    ],
  },
  {
    id: "client_proposal",
    title: "Freelance Proposal",
    description: "For freelancers & agencies.",
    icon: "✍️",
    fields: [
      {
        id: "client",
        label: "Client Name / Industry",
        placeholder: "e.g., A Jaipur-based handicraft store",
        type: "input",
      },
      {
        id: "project",
        label: "Project Overview",
        placeholder:
          "e.g., To design and develop a new e-commerce website to boost online sales",
        type: "textarea",
      },
      {
        id: "deliverables",
        label: "Key Deliverables",
        placeholder: "e.g., 5-page website design, Shopify development",
        type: "textarea",
      },
    ],
  },
  {
    id: "lesson_plan",
    title: "Educator Lesson Plan",
    description:
      "For teachers to generate structured lesson plans with activities.",
    icon: "🍎",
    fields: [
      {
        id: "topic",
        label: "Lesson Topic",
        placeholder: "e.g., Introduction to Photosynthesis for Class 10",
        type: "input",
      },
      {
        id: "objective",
        label: "Learning Objectives",
        placeholder: "e.g., Students will be able to define photosynthesis.",
        type: "textarea",
      },
      {
        id: "duration",
        label: "Class Duration (in minutes)",
        placeholder: "e.g., 45 minutes",
        type: "input",
      },
    ],
  },
];

// --- Main Page Component ---
export default function GeneratePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [idea, setIdea] = useState("");
  const [report, setReport] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/api/auth/signin");
    // Dynamically load the html-to-docx script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/html-to-docx@1.8.0/dist/html-to-docx.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [status, router]);

  const handleEnhancePrompt = async () => {
    if (!idea || !selectedTemplate) return;

    setIsEnhancing(true);

    setError("");

    try {
      const response = await fetch("/api/enhance", {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ idea, template: selectedTemplate }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || "Failed to enhance prompt");

      setIdea(data.enhancedPrompt);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsEnhancing(false);
    }
  };
  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!idea || !selectedTemplate) return;
    setIsGenerating(true);
    setError("");
    setReport("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, template: selectedTemplate.id }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to generate report");
      setReport(data.pitch || "");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    setSelectedTemplate(null);
    setIdea("");
    setReport("");
    setError("");
  };

  // --- ⬇️ START: CORRECTED & FINAL DOWNLOAD FUNCTIONS ⬇️ ---

  const downloadPDF = () => {
    if (!report) {
      alert("Report content is not available.");
      return;
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const sections = report.split("\n\n").map((block) => ({
      title: block.split("\n")[0]?.trim() || "",
      content: block.split("\n").slice(1).join("\n").trim(),
    }));

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    const topMargin = 25;
    const bottomMargin = 25;
    let pageNumber = 1;

    const addHeader = (text: string) => {
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor("#64748b");
      doc.text(text, margin, 15);
    };
    const addFooter = () => {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor("#94a3b8");
      doc.text(`Page ${pageNumber}`, pageWidth - margin, pageHeight - 15, {
        align: "right",
      });
    };

    const calculateSectionHeight = (section: Section) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      const titleLines = doc.splitTextToSize(
        section.title.toUpperCase(),
        contentWidth
      );
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const contentLines = doc.splitTextToSize(section.content, contentWidth);
      const titleHeight = titleLines.length * 7 + 10;
      const contentHeight = contentLines.length * 5;
      return titleHeight + contentHeight;
    };

    // 1. Title Page
    addHeader(selectedTemplate?.title || "Report");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor("#0f172a");
    const titleLines = doc.splitTextToSize(
      idea.slice(0, 100),
      contentWidth * 0.9
    );
    doc.text(titleLines, pageWidth / 2, pageHeight / 2 - 20, {
      align: "center",
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor("#475569");
    doc.text("AI Generated Report", pageWidth / 2, pageHeight / 2 + 10, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.setTextColor("#94a3b8");
    doc.text(
      `Report Date: ${new Date().toLocaleDateString("en-IN")}`,
      pageWidth / 2,
      pageHeight - 30,
      { align: "center" }
    );
    addFooter();

    // 2. Content Pages
    doc.addPage();
    pageNumber++;
    addHeader(selectedTemplate?.title || "Report");
    let y = topMargin;

    sections.forEach((section, index) => {
      if (!section.title || !section.content) return;
      const sectionHeight = calculateSectionHeight(section);
      const spaceForNextSection = pageHeight - y - bottomMargin;

      if (index > 0 && sectionHeight > spaceForNextSection) {
        addFooter();
        doc.addPage();
        pageNumber++;
        y = topMargin;
        addHeader(selectedTemplate?.title || "Report");
      }
      if (index > 0) y += 10;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor("#1e293b");
      const sectionTitleLines = doc.splitTextToSize(
        section.title.toUpperCase(),
        contentWidth
      );
      doc.text(sectionTitleLines, margin, y);
      y += sectionTitleLines.length * 7 + 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor("#334155");
      const contentLines = doc.splitTextToSize(section.content, contentWidth);
      contentLines.forEach((line: string) => {
        if (y + 5 > pageHeight - bottomMargin) {
          addFooter();
          doc.addPage();
          pageNumber++;
          y = topMargin;
          addHeader(selectedTemplate?.title || "Report");
          doc.setFontSize(9);
          doc.setTextColor("#64748b");
          doc.text(`( ${section.title.toUpperCase()} - Continued )`, margin, y);
          y += 10;
        }
        doc.text(line, margin, y);
        y += 5;
      });
    });

    addFooter();
    doc.save(`QuickPitch-${selectedTemplate?.title.replace(/\s+/g, "-")}.pdf`);
  };

  const downloadDocx = async () => {
    if (!report || !(window as any).htmlToDocx) {
      alert(
        "Report content is not available or the DOCX script is loading. Please try again in a moment."
      );
      return;
    }

    const sections = report.split("\n\n").map((block) => ({
      title: block.split("\n")[0]?.trim() || "",
      content: block.split("\n").slice(1).join("\n").trim(),
    }));

    let htmlString = `<h1 style="font-size: 24px; font-weight: bold; color: #0f172a;">${idea.slice(
      0,
      100
    )}</h1>`;
    htmlString += `<h2 style="font-size: 18px; font-weight: bold; color: #475569;">${selectedTemplate?.title}</h2><br/>`;

    sections.forEach((sec) => {
      if (sec.title && sec.content) {
        htmlString += `<h3 style="font-size: 16px; font-weight: bold; color: #b45309; margin-top: 20px;">${
          sec.title
        }</h3><p style="font-size: 12px; line-height: 1.5;">${sec.content.replace(
          /\n/g,
          "<br/>"
        )}</p>`;
      }
    });

    const blob = await (window as any).htmlToDocx.asBlob(htmlString);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `QuickPitch-${selectedTemplate?.title.replace(
      /\s+/g,
      "-"
    )}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- ⬆️ END: CORRECTED & FINAL DOWNLOAD FUNCTIONS ⬆️ ---
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
                   {" "}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AI Report Generator</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimatePresence mode="wait">
            {!selectedTemplate ? (
              <motion.div
                key="selector"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                    AI Report Generator
                  </h1>
                  <p className="text-xl text-slate-600">
                    What would you like to create?
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {templates.map((t) => (
                    <motion.div
                      key={t.id}
                      whileHover={{ scale: 1.03, y: -5 }}
                      onClick={() => setSelectedTemplate(t)}
                      className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 cursor-pointer transition-shadow hover:shadow-xl"
                    >
                      <div className="text-3xl mb-3">{t.icon}</div>
                      <h2 className="text-xl font-bold text-slate-800">
                        {t.title}
                      </h2>
                      <p className="text-slate-600 mt-1">{t.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="workspace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  onClick={handleBack}
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 mb-8 flex items-center gap-2"
                >
                  ← Back to Templates
                </button>
                {report && !isGenerating ? (
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
                    <article className="p-6 md:p-10 prose prose-slate max-w-none">
                      <div className="whitespace-pre-line">{report}</div>
                    </article>
                    <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => handleSubmit()}
                        className="flex-1 bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 flex justify-center items-center gap-2"
                      >
                        Regenerate
                      </button>
                      <button
                        onClick={downloadPDF}
                        className="flex-1 border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:border-amber-400 hover:text-amber-700"
                      >
                        Download PDF
                      </button>
                      <button
                        onClick={downloadDocx}
                        className="flex-1 border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:border-amber-400 hover:text-amber-700"
                      >
                        Download DOCX
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200">
                    <div className="flex items-start gap-4 mb-6">
                      <span className="text-3xl mt-1">
                        {selectedTemplate.icon}
                      </span>
                      <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                          {selectedTemplate.title}
                        </h1>
                        <p className="text-slate-600 text-sm">
                          Describe your topic below, or enhance a simple idea
                          with AI.
                        </p>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <textarea
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder={selectedTemplate.placeholder}
                        className="w-full h-40 p-4 text-base text-slate-800 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 resize-none transition-shadow"
                      />
                      {error && (
                        <div className="p-3 bg-red-50 text-red-700 text-sm font-medium rounded-lg border border-red-200">
                          {error}
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          type="button"
                          onClick={handleEnhancePrompt}
                          disabled={
                            isEnhancing || isGenerating || idea.length < 5
                          }
                          className="flex-1 bg-amber-100 text-amber-800 px-6 py-3 rounded-lg font-semibold hover:bg-amber-200 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
                        >
                          {isEnhancing ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-800"></div>
                          ) : (
                            "✨ Enhance Prompt"
                          )}
                        </button>
                        <button
                          type="submit"
                          disabled={
                            isGenerating || isEnhancing || idea.length < 10
                          }
                          className="flex-1 bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-900 transition-all shadow-lg disabled:opacity-50"
                        >
                          {isGenerating ? "Generating..." : "Generate Report"}
                        </button>
                      </div>
                    </form>
                    {isGenerating && (
                      <div className="text-center pt-6 mt-6 border-t border-slate-200">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800 mx-auto"></div>
                        <p className="mt-4 text-slate-600 font-semibold">
                          The AI is authoring your report...
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
