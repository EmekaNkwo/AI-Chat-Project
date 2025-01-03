"use client";
import React from "react";
import ChatInput from "./ChatInput";

import HeaderSelection from "./HeaderSelection";

import useChatPage from "./useChatPage";
import { Bubble } from "@ant-design/x";
import { Button, Flex } from "antd";
import { IoMdCopy } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

const ChatApp: React.FC = () => {
  const {
    messages,
    userInput,
    setUserInput,
    handleEdit,
    stopGeneration,
    isLoading,
    error,
    pendingMessage,
    isEditMode,
    handleSubmit,
    renderMarkdown,
    currentMessageIndex,
    messageContainerRef,
    copyToClipboard,
  } = useChatPage();

  return (
    <>
      <div className="flex flex-col  bg-[#121212]">
        <HeaderSelection />
        <div className="w-[80%] mx-auto ">
          <>
            <div
              className="max-h-[70vh] min-h-[72vh] overflow-y-scroll mt-4"
              ref={messageContainerRef}
            >
              {messages.map((msg, i) => {
                const isAI = !!(i % 2);
                const content = msg?.text;
                const isEditedAIResponse =
                  isEditMode && i === currentMessageIndex + 1;

                return (
                  <div
                    key={i}
                    className={`
        flex 
        ${isAI ? "justify-start" : "justify-end"}
        w-full 
        mb-2 
      `}
                  >
                    <Bubble
                      typing={{
                        step: 5,
                        interval: 20,
                      }}
                      loading={isEditedAIResponse && isLoading}
                      placement={isAI ? "start" : "end"}
                      variant="shadow"
                      role={isAI ? "ai" : "user"}
                      content={content?.replace(/<[^>]*>/g, "")}
                      messageRender={renderMarkdown}
                      className={`
          ${isAI ? "bg-[#2D2D2D]" : "bg-[#171717]"} 
          text-[#fff] 
          relative 
          mt-2
          rounded-[16px]
          ${isAI ? "lg:max-w-[50%] w-fit" : "lg:max-w-[50%] w-fit"}
          overflow-hidden
          ${isAI ? "rounded-bl-none" : "rounded-br-none"}
          ${isEditedAIResponse && isLoading ? "opacity-50" : ""}
        `}
                      footer={
                        <Flex gap={12} className="p-2">
                          <Button
                            color="default"
                            variant="text"
                            size="small"
                            className="text-white"
                            onClick={() => {
                              copyToClipboard(msg.text);
                            }}
                            icon={<IoMdCopy size={20} color="#E4E4E4" />}
                          />
                          {!isAI && (
                            <Button
                              color="default"
                              variant="text"
                              size="small"
                              onClick={() => handleEdit(i)}
                              icon={<FaRegEdit size={20} color="#E4E4E4" />}
                            />
                          )}
                        </Flex>
                      }
                    />
                  </div>
                );
              })}
              {!isEditMode ? (
                <>
                  {isLoading && pendingMessage && (
                    <>
                      <div className="flex justify-end w-full mb-2 animate-fadeIn">
                        <Bubble
                          placement="end"
                          variant="shadow"
                          role="user"
                          content={pendingMessage?.replace(/<[^>]*>/g, "")}
                          messageRender={renderMarkdown}
                          style={{
                            width: "600px",
                          }}
                          className="bg-[#202020]  rounded-[16px] rounded-br-none my-2"
                        />
                      </div>
                      <div className="flex justify-start w-fit mb-2 animate-fadeIn">
                        <Bubble
                          placement="start"
                          variant="shadow"
                          role="ai"
                          loading
                          className="bg-[#2D2D2D] rounded-[16px] rounded-bl-none"
                        />
                      </div>
                    </>
                  )}
                </>
              ) : null}
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
                  <p className="text-red-500 text-sm mt-2 text-center">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
