import { NextResponse } from "next/server";
import axios from 'axios';

const FLASK_API_URL = 'http://127.0.0.1:5000/transcribe';

export async function POST(req: Request) {
  try {
    const { transcribedText } = await req.json();

    if (!transcribedText) {
      return NextResponse.json(
        { error: "Transcribed text is required" },
        { status: 400 }
      );
    }

    // Forward the request to Flask backend
    const response = await axios.post(FLASK_API_URL, {
      transcribedText: transcribedText
    });

    // Return the Flask backend response
    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.error("Error processing transcription:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 