import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    return new NextResponse(
      JSON.stringify({
        response: `LLM response for prompt: ${prompt}`,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return new NextResponse(
      JSON.stringify({
        status: "failed",
        message: "Error, something went wrong",
      }),
      {
        status: 409,
      }
    );
  }
}
