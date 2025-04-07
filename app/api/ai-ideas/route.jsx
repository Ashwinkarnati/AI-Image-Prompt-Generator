import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  const { prompt } = await request.json();

  try {
    // Initialize the Gemini API with the latest 1.5 Flash model
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract and clean up the list of prompt ideas from the response
    const ideas = text
      .split("\n")
      .map((line) => line.replace(/^\d+[\).\s-]*/, "").trim())
      .filter(Boolean);

    return Response.json({
      success: true,
      ideas: ideas.length > 0
        ? ideas
        : [
            "Modern minimalist design",
            "Vintage illustration style",
            "Abstract visual concept",
            "Character-based artwork",
          ],
    });
  } catch (error) {
    console.error("Gemini 1.5 Flash API error:", error);
    return Response.json({
      success: false,
      error: error.message,
      ideas: [
        "Modern minimalist design",
        "Vintage illustration style",
        "Abstract visual concept",
        "Character-based artwork",
      ],
    });
  }
}
