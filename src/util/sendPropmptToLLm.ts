import { HfInference } from "@huggingface/inference";

const hf = new HfInference(`${process.env.NEXT_PUBLIC_TOKEN}`);

// Format the prompt for chat context
function formatPrompt(prompt: string) {
  return `<s>[INST] You are a helpful and professional AI assistant. Provide clear, concise, and relevant responses.

${prompt} [/INST]</s>`;
}
export async function sendPromptToLLM(prompt: string) {
  try {
    const formattedPrompt = formatPrompt(prompt);
    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: formattedPrompt,

      parameters: {
        max_new_tokens: 512, // Increased for more detailed responses
        temperature: 0.6, // Good balance between creativity and coherence
        top_p: 0.9, // Nucleus sampling for better text quality
        top_k: 40, // Limit vocabulary diversity for more focused responses
        repetition_penalty: 1.1, // Reduce repetitive text
        stop: ["</s>", "[/INST]", "<s>"], // Stop tokens to prevent continuing the conversation format
      },
    });

    const cleanedResponse = response.generated_text
      .replace(formattedPrompt, "")
      .replace(/<s>|<\/s>|\[INST\]|\[\/INST\]/g, "")
      .trim();

    return cleanedResponse;
  } catch (error) {
    console.error("Error communicating with the LLM:", error);
    throw new Error("Failed to get response from the LLM");
  }
}
