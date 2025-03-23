import axios from 'axios';
import { NextResponse } from "next/server";
// Define the Flask API URL
const flaskApiUrl = 'http://127.0.0.1:5000/greet';

export async function GET(req:Request) {
  // Get the 'text' query parameter from the URL
  const url = new URL(req.url);
    const text = url.searchParams.get("text");

    if (!text) {
        return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
        );
    }
  try {
    // Make a GET request to the Flask API with the 'text' query parameter
    const response = await axios.get(flaskApiUrl, {
      params: { text },  // Pass the 'text' parameter to the Flask API
    });

    // Send the result (audio or URL) back to the client
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    // Handle errors from the Flask API
    console.error('Error while calling Flask API:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate music' }),
      { status: 500 }
    );
  }
}
