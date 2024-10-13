"use client";
import React, { useEffect } from "react";
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
    handleSend,
    handleEdit,
    stopGeneration,
    isLoading,
    error,
  } = useChatPage();

  useEffect(() => {
    // Re-highlight code blocks whenever messages are updated
    Prism.highlightAll();
  }, [messages]);

  console.log(messages);

  return (
    <>
      <HeaderSelection />
      <div className="flex flex-col gap-2 p-4">
        <div className="max-h-[73vh] min-h-[71vh] w-[74%] mb-3 mx-auto overflow-y-auto">
          {messages?.map((msg, i) => (
            <div key={i}>
              <div
                className={
                  msg.isUser
                    ? "text-[#E4E4E4] w-[48%]"
                    : "  w-[48%] ml-auto text-[#E4E4E4] p-3 rounded-[12px] bg-[#202020]"
                }
              >
                <ReactMarkdown
                  components={{
                    code({ className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <>
                          <CodeBlock
                            code={String(children).replace(/\n$/, "")}
                            language={match[1]}
                          />
                        </>
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
              <div
                className={`flex items-center my-[1rem]   ${
                  msg.isUser ? "justify-start" : "justify-end"
                }`}
              >
                <div className="bg-[#202020] flex items-center  p-1 rounded-[12px]">
                  <ActionIcon
                    icon={
                      <BiSolidEdit
                        onClick={() => handleEdit(i)}
                        className="cursor-pointer"
                        color="#E4E4E4"
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
        </div>

        <div className="mx-auto">
          <ChatInput
            onSubmit={handleSend}
            text={userInput}
            setText={setUserInput}
            isLoading={isLoading}
            stopGeneration={stopGeneration}
          />
        </div>

        {error && <p className="text-red-500 text-[14px]">{error}</p>}
      </div>
    </>
  );
};

export default ChatApp;
