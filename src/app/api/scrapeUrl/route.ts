import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import axios from "axios";
import { sendPromptToLLM } from "@/util/sendPropmptToLLm";

async function scrapeContent(url: string) {
  try {
    // Fetch the website content
    const response = await axios.get(url);
    const html = response.data;

    // Load the HTML content into cheerio
    const $ = cheerio.load(html);

    // Remove script and style tags
    $("script, style").remove();

    // Get the text content and remove extra whitespace
    const rawText = $("body").text().replace(/\s+/g, " ").trim();

    return rawText;
  } catch (error) {
    console.error("Error scraping website:", (error as Error).message);
    return null;
  }
}
export async function POST(req: Request) {
  try {
    const originalPrompt = await req.json();
    // eslint-disable-next-line prefer-const
    let updatedPrompt = originalPrompt.inputs;

    const includeUrlPattern = /\[include-url:\s*\[([^\]]+)\]\s*.*?\]/g;
    const urls = [...updatedPrompt.matchAll(includeUrlPattern)];
    // const { url } = await req.json();
    // const { data } = await axios.get(url);

    for (const url of urls) {
      const scrapedContent = await scrapeContent(url[1]);
      updatedPrompt.replace(url[0], scrapedContent);
    }

    try {
      const llmResponse = await sendPromptToLLM(updatedPrompt);
      return new NextResponse(
        JSON.stringify({
          response: `${llmResponse}`,
        }),
        {
          status: 200,
        }
      );
    } catch {
      return new NextResponse(
        JSON.stringify({
          error: "Error communicating with the LLM",
        }),
        {
          status: 500,
        }
      );
    }

    // const $ = cheerio?.load(data);
    // $("script, style").remove();

    // const rawText = $("body").text().replace(/\s+/g, " ").trim();

    // if (rawText === null) {
    //   return new NextResponse(
    //     JSON.stringify({
    //       status: "Failed",
    //       message: "Failed to scrape website",
    //     }),
    //     {
    //       status: 500,
    //     }
    //   );
    // }
    // return new NextResponse(
    //   JSON.stringify({
    //     response: `${rawText}`,
    //   }),
    //   {
    //     status: 200,
    //   }
    // );
  } catch (error) {
    console.error("Error in API route:", error);

    return new NextResponse(
      JSON.stringify({
        status: "failed",
        message: "Internal server error",
      }),
      {
        status: 500,
      }
    );
  }
}
