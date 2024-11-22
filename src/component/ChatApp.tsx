"use client";
import React, { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import Prism from "prismjs";
import HeaderSelection from "./HeaderSelection";
import IconCopy from "@/assets/IconCopy";
import { BiSolidEdit } from "react-icons/bi";
import IconDownload from "@/assets/IconDownload";
import IconLink from "@/assets/IconLink";
import { ActionIcon } from "@/shared/UIs";
import useChatPage from "./useChatPage";

const ChatApp: React.FC = () => {
  const {
    messages,
    userInput,
    setUserInput,
    handleEdit,
    stopGeneration,
    isLoading,
    error,
    pendingMessage, handleSubmit, 
  } = useChatPage();

  useEffect(() => {
    Prism.highlightAll();
  }, [messages]);

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLoading && pendingMessage) {
      scrollToBottom();
    }
  }, [isLoading, pendingMessage]);

  return (
   <>
   
    <div className="flex flex-col min-h-[90vh] bg-[#121212]">
      <HeaderSelection />
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col max-w-5xl mx-auto px-4">
          <div
            ref={messageContainerRef}
            className="flex-1 overflow-y-auto py-4 space-y-6"
          >
            {messages?.map((msg, i) => (
              <div key={i} className="animate-fadeIn group">
                <div
                  className={`flex ${
                    msg.isUser ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`${
                      msg.isUser
                        ? "bg-[#2D2D2D] text-[#E4E4E4] rounded-br-[16px]"
                        : "bg-[#202020] text-[#E4E4E4] rounded-bl-[16px]"
                    } max-w-[85%] lg:max-w-[65%] p-4 rounded-t-[16px] shadow-lg relative`}
                  >
                    <ReactMarkdown
                      components={{
                        code({ className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return match ? (
                            <CodeBlock
                              code={String(children).replace(/\n$/, "")}
                              language={match[1]}
                            />
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {`${msg?.text?.replace(/<[^>]*>/g, "")}`}
                    </ReactMarkdown>
                  </div>
                </div>
                <div
                  className={`flex items-center mt-2 ${
                    msg.isUser ? "justify-start" : "justify-end"
                  }`}
                >
                 <div className="bg-[#202020] flex items-center p-1.5 rounded-[12px] gap-2 shadow-md  transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
                    <ActionIcon
                      icon={
                        <BiSolidEdit
                          onClick={() => handleEdit(i)}
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                          color="#E4E4E4"
                          size={18}
                        />
                      }
                    />
                    <ActionIcon icon={<IconCopy />} />
                    <ActionIcon icon={<IconDownload />} />
                    <ActionIcon icon={<IconLink />} />
                  </div>
                </div>
              </div>
            ))}
            {isLoading && pendingMessage && (
              <>
                <div className="animate-fadeIn group">
                  <div className="flex justify-start">
                    <div className="bg-[#2D2D2D] text-[#E4E4E4] rounded-br-[16px] max-w-[85%] lg:max-w-[65%] p-4 rounded-t-[16px] shadow-lg relative">
                      {pendingMessage.replace(/<[^>]*>/g, "")}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end animate-fadeIn">
                  <div className="bg-[#202020] max-w-[85%] lg:max-w-[65%] p-4 rounded-bl-[16px] rounded-t-[16px] shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#E4E4E4] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-[#E4E4E4] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-[#E4E4E4] rounded-full animate-bounce"></div>
                      </div>
                      <span className="text-[#E4E4E4] text-sm">Generating response...</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="py-4 border-t border-[#2D2D2D]">
            <div className="max-w-3xl mx-auto">
              <ChatInput
                onSubmit={handleSubmit}
                text={userInput}
                setText={setUserInput}
                isLoading={isLoading}
                stopGeneration={stopGeneration}
              />
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default ChatApp;
