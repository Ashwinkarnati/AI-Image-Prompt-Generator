// app/api/ai-img-model/route.js
import { AILogoPrompt } from "@/configs/AIModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    const text = await AiPromptResult.response.text();

    // More robust text cleaning
    let cleanText = text
      .replace(/```(json)?\n?/g, '')  // Remove all code block markers
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
      .trim();

    // Handle cases where the response might be just the JSON content
    if (!cleanText.startsWith('{') && !cleanText.startsWith('[')) {
      // Try to extract JSON from text if it's embedded in other content
      const jsonMatch = cleanText.match(/\{.*\}|\[.*\]/s);
      if (jsonMatch) {
        cleanText = jsonMatch[0];
      }
    }

    // Safely parse JSON with error handling
    let jsonData;
    try {
      jsonData = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      // Try to fix common JSON issues
      cleanText = cleanText
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/(\w+)\s*:/g, '"$1":') // Add quotes around unquoted keys
        .replace(/:\s*'([^']+)'/g, ': "$1"') // Replace quoted values
        .replace(/,\s*}/g, '}') // Remove trailing commas
        .replace(/,\s*]/g, ']'); // Remove trailing commas in arrays

      jsonData = JSON.parse(cleanText);
    }

    // Extract the prompt or use the entire response if structure is different
    const aiGenPrompt = jsonData.prompt || jsonData.response || jsonData;

    return NextResponse.json({ 
      prompt: aiGenPrompt 
    });

  } catch (e) {
    console.error("API Error:", e.message);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to generate image prompt",
        details: e.message 
      },
      { status: 500 }
    );
  }
}