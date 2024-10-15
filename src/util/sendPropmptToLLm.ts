import { HfInference } from "@huggingface/inference";

const hf = new HfInference(`${process.env.NEXT_PUBLIC_TOKEN}`);
export async function sendPromptToLLM(prompt: string) {
  try {
    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: prompt,

      parameters: {
        max_new_tokens: 300, // Adjust as needed for the response length
        temperature: 0.7, // Adjust temperature for creativity level
      },
    });
    console.log(response);

    return response.generated_text;
  } catch (error) {
    console.error("Error communicating with the LLM:", error);
    throw new Error("Failed to get response from the LLM");
  }
}
