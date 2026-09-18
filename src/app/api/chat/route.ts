import { NextRequest, NextResponse } from "next/server";
import { generatePortfolioResponse } from "@/lib/ai/response";

// Basic in-memory rate limiting per IP (15 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limitWindow = 60 * 1000; // 1 minute
  const maxRequests = 20;

  const current = rateLimitMap.get(ip);
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + limitWindow });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: "Rate limit reached. Please wait a moment before sending more questions.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message must be a non-empty string." },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Message exceeds maximum allowed length (1000 characters)." },
        { status: 400 }
      );
    }

    const response = await generatePortfolioResponse(message, history || []);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred while processing your question.",
        answer:
          "I encountered an error processing your query. Please explore Karrim's portfolio using the navigation tabs above.",
        provider: "grounded-fallback",
      },
      { status: 500 }
    );
  }
}
