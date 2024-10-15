import { baseUrl } from "@/util/apiConfig";
import axios from "axios";
import { useRef, useState } from "react";

interface IMessage {
  text: string;
  isUser: boolean;
}

const URL = `${baseUrl}/api`;
const useChatPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  //   const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setIsLoading(true);
    setError("");

    const response = await sendToLLM(userInput);
    setMessages([
      ...messages,
      { text: userInput, isUser: true },
      { text: response, isUser: false },
    ]);
    setUserInput("");
    setIsLoading(false);
  };
  const sendToLLM = async (input: string) => {
    const textWithoutHtml = input.replace(/<[^>]*>/g, "");
    try {
      const { data } = await axios.post(
        `${URL}/scrapeUrl`,
        { inputs: textWithoutHtml },
        { signal: abortControllerRef?.current?.signal }
      );
      return data.response;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request aborted");
      } else {
        console.error("Error:", error);
      }
    }
  };
  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  };

  const handleEdit = (index: number) => {
    const messageToEdit = messages[index].text;
    setUserInput(messageToEdit);
    // Remove the message being edited from the list
    setMessages(messages.filter((_, i) => i !== index));
  };
  return {
    messages,
    userInput,
    setUserInput,
    isLoading,
    error,
    handleSend,
    sendToLLM,
    stopGeneration,
    handleEdit,
  };
};

export default useChatPage;
