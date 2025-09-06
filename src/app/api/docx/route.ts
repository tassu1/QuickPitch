// src/app/api/docx/route.ts
import { NextResponse } from "next/server";
import { Document, Packer, Paragraph, TextRun } from "docx";

export async function POST(req: Request) {
  try {
    const { report = "", title = "report" } = await req.json();

    // Convert report string into paragraphs
    const paragraphs = report.split("\n").map(
      (line: string) =>
        new Paragraph({
          children: [new TextRun(line)],
        })
    );

    // ✅ Create Document with sections directly
    const doc = new Document({
      sections: [
        {
          children: paragraphs,
        },
      ],
    });

    // Generate buffer
    const buffer = await Packer.toBuffer(doc);
    const uint8Array = new Uint8Array(buffer);

    // Return as DOCX download
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${title.replace(
          /\s+/g,
          "-"
        )}.docx"`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
