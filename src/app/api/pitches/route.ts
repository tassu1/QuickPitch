// src/app/api/pitches/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const pitches = await db.collection("pitches").find().toArray();

    return NextResponse.json(pitches);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch pitches" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const data = await req.json();

    if (!data.idea || !data.pitch) {
      return NextResponse.json({ error: "Idea and pitch are required" }, { status: 400 });
    }

    const result = await db.collection("pitches").insertOne({
      idea: data.idea,
      pitch: data.pitch,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Pitch saved!", id: result.insertedId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save pitch" }, { status: 500 });
  }
}
