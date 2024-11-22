import { baseUrl } from "@/util/apiConfig";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface IMessage {
  text: string;
  isUser: boolean;
}

const URL = `${baseUrl}/api`;
const useChatPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [textForEdit, setTextForEdit] = useState("");
  const [pendingMessage, setPendingMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setIsLoading(true);
    setError("");

    abortControllerRef.current = new AbortController();
    const response = await sendToLLM(userInput);
    if (isEditMode) {
      // Replace the edited message and add new LLM response
      const newMessages = [...messages];
      newMessages[currentMessageIndex] = { text: userInput, isUser: true };
      // Remove any subsequent messages and add new LLM response
      newMessages.splice(currentMessageIndex + 1);
      newMessages.push({ text: response, isUser: false });
      setMessages(newMessages);
      setIsEditMode(false); // Reset edit mode
    } else {
      // Normal message flow
      setMessages([
        ...messages,
        { text: userInput, isUser: true },
        { text: response, isUser: false },
      ]);
    }
    setUserInput("");
    setIsLoading(false);
    abortControllerRef.current = null;
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
    const messageToEdit = messages[index];
    // Only allow editing user messages
    if (!messageToEdit.isUser) return;
    setIsEditMode(true);
    setUserInput(messageToEdit.text);
    setCurrentMessageIndex(index);
    
    // Clear any pending operations
    setPendingMessage("");
    if (isLoading) {
      stopGeneration();
    }
  };
  const handleSubmit = () => {
    setPendingMessage(userInput);
    handleSend();
  };
  
  useEffect(() => {
    if (!isLoading) {
      setPendingMessage("");
    }
  }, [isLoading]);
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
    pendingMessage,
    handleSubmit,
    textForEdit, setTextForEdit
  };
};

export default useChatPage;
