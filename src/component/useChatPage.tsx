import { baseUrl } from "@/util/apiConfig";
import { BubbleProps } from "@ant-design/x";
import Prism from "prismjs";
import { message, Typography } from "antd";
import axios from "axios";
import markdownit from "markdown-it";
import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";

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

  const md = markdownit({
    html: true,
    breaks: true,
    typographer: true,
    linkify: true,
    highlight: function (str: string, lang: string): string {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre><code class="hljs">' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            "</code></pre>"
          );
        } catch {
          // Explicitly return a fallback string in case of error
          return (
            '<pre><code class="hljs">' +
            md.utils.escapeHtml(str) +
            "</code></pre>"
          );
        }
      }

      return (
        '<pre><code class="hljs">' + md.utils.escapeHtml(str) + "</code></pre>"
      );
    },
  });

  const renderMarkdown: BubbleProps["messageRender"] = (content) => (
    <Typography>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: used in demo */}
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: md.render(content) }}
      />
    </Typography>
  );

  const handleSend = async () => {
    if (!userInput.trim()) return;

    try {
      setIsLoading(true);
      setError("");
      setPendingMessage(userInput);

      // If in edit mode, update the specific message
      if (isEditMode) {
        // Create a new messages array with the updated message
        const updatedMessages = messages.map((msg, index) =>
          index === currentMessageIndex ? { ...msg, text: userInput } : msg
        );

        // Update messages state
        setMessages(updatedMessages);

        // Resend the query with updated messages
        abortControllerRef.current = new AbortController();
        const response = await sendToLLM(userInput);

        // Update the AI response for the edited message
        const newAIResponse = response;

        // Update messages again to include AI response
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === currentMessageIndex + 1
              ? { ...msg, text: newAIResponse }
              : msg
          )
        );

        // Reset edit mode
        setIsEditMode(false);
        setCurrentMessageIndex(0);
      } else {
        // Existing logic for new message
        setPendingMessage(userInput);

        abortControllerRef.current = new AbortController();
        const response = await sendToLLM(userInput);

        setMessages([
          ...messages,
          { text: userInput, isUser: true },
          { text: response, isUser: false },
        ]);
      }

      // Clear input
      setUserInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

  useEffect(() => {
    Prism.highlightAll();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLoading && pendingMessage) {
      scrollToBottom();
    }
  }, [isLoading, pendingMessage]);

  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      const scrollHeight = messageContainerRef.current.scrollHeight;
      messageContainerRef.current.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success("Text copied to clipboard");
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
    pendingMessage,
    handleSubmit,
    textForEdit,
    setTextForEdit,
    renderMarkdown,
    isEditMode,
    currentMessageIndex,
    messageContainerRef,
    copyToClipboard,
  };
};

export default useChatPage;
