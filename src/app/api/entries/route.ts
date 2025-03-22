import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { authenticateToken } from "@/app/api/middleware";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {

    // Get user from the JWT token (optional step, assuming JWT is passed in headers)
    const user = await authenticateToken(req);
    if (user instanceof Response) return user;


    const { date, musicString, animationURL, voiceString, text } = await req.json();

    // Ensure the required fields are provided
    if (!date || !musicString || !animationURL || !voiceString || !text)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    

    // Create the new entry in the database
    const newEntry = await prisma.entry.create({
      data: {
        date: new Date(date), // Ensure date is parsed correctly
        musicString,
        animationURL,
        voiceString,
        text,
        user: {
          connect: { id: user.id }, // Connecting the entry to the authenticated user
        },
      },
    });

    // Return the created entry
    return NextResponse.json(
      {
        message: "Entry created successfully",
        entry: newEntry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
    try {
      // Get the date query parameter
      const url = new URL(req.url);
      const dateParam = url.searchParams.get("date");
  
      if (!dateParam) {
        return NextResponse.json(
          { error: "Date parameter is required" },
          { status: 400 }
        );
      }
  
      // Parse the date to a Date object (ensuring valid date format)
      const date = new Date(dateParam);
      if (isNaN(date.getTime())) {
        return NextResponse.json(
          { error: "Invalid date format" },
          { status: 400 }
        );
      }
  
      // Query the entries based on the provided date
      const entries = await prisma.entry.findMany({
        where: {
          date: {
            gte: date, // Greater than or equal to the provided date
            lt: new Date(date.getTime() + 24 * 60 * 60 * 1000), // Less than the next day (to capture full day)
          },
        },
      });
  
      // Return the list of entries
      if (entries.length === 0) {
        return NextResponse.json(
          { message: "No entries found for the given date" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(entries, { status: 200 });
    } catch (error) {
      console.error("Error fetching entries:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }