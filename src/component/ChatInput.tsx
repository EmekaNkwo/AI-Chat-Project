"use client";
import IconSend from "@/assets/IconSend";
import { IconWithText } from "@/shared/UIs";
import { Progress } from "antd";
import React from "react";
import { FaStopCircle } from "react-icons/fa";
import { MdAdd, MdPerson } from "react-icons/md";
import { PiQuotesFill } from "react-icons/pi";
import { RiSlashCommands2 } from "react-icons/ri";
import ReactQuill from "react-quill";
import CommandModal from "./CommandModal";

const ChatInput: React.FC<{
  onSubmit: () => void;
  isLoading?: boolean;
  stopGeneration: () => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}> = ({ onSubmit, isLoading, stopGeneration, text, setText }) => {
  const handleSubmit = () => {
    onSubmit();
    setText("");
  };
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <>
      {openModal && (
        <CommandModal
          isModalOpen={openModal}
          setIsModalOpen={setOpenModal}
          setText={setText}
        />
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center w-full border border-[#2D2D2D] p-2 rounded-[8px]">
          <ReactQuill
            value={text}
            theme=""
            onChange={setText}
            placeholder="Type '/' for quick access to the command menu. Use '||' to enter multiple prompts."
            className="w-[55vw] text-[#797979] placeholder:text-[#797979]"
            modules={{ toolbar: false }}
          />
          {isLoading ? (
            <button
              onClick={stopGeneration}
              className="w-fit p-2 flex items-center gap-2 text-[12px] text-[#747474] font-[500]"
            >
              <FaStopCircle size={26} />
              <span> Stop</span>
            </button>
          ) : (
            <>
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className="w-fit p-2 min-w-[80px] flex items-center gap-2 text-[12px] text-[#747474] font-[500]"
              >
                <span>⌘↵ </span> <span> Send</span> <IconSend />{" "}
              </button>
            </>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4 mt-2">
            <IconWithText
              icon={<RiSlashCommands2 />}
              text="Commands"
              onClick={() => setOpenModal(true)}
            />
            <IconWithText
              icon={<PiQuotesFill className="transform rotate-180" />}
              text="Prompts"
            />
            <IconWithText icon={<MdPerson />} text="Personas" />
            <IconWithText icon={<MdAdd />} text="Add" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#797979] font-[400] text-[13px]">
              32/618
            </span>
            <Progress
              type="dashboard"
              percent={15}
              showInfo={false}
              size={25}
              trailColor="#202020"
              strokeColor={"#D9D9D9"}
              className="transform rotate-90"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ChatInput);
