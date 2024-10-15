import { Modal } from "antd";
import React from "react";
import { BiWorld } from "react-icons/bi";
import { FaLink } from "react-icons/fa";
import { RiSlashCommands2 } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
const Commands = ({
  icon,
  title,
  description,
  onClick,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  onClick?: () => void;
}) => {
  return (
    <div className="bg-[#121212] rounded-[6px] p-3 flex flex-col gap-2">
      <div className="flex gap-3 items-center">
        {icon}{" "}
        <span className="text-[#E4E4E4] font-[500] text-[14px]">{title}</span>
      </div>
      <div className="flex items-center justify-between ">
        <span className="text-[#797979] font-[500] text-[14px]">
          {description}
        </span>
        <div className="flex items-center gap-2">
          <button className="text-[#E4E4E4] border-[1px] bg-transparent border-[#333333] py-1 px-2 rounded-[8px] font-[500] text-[14px] outline-none">
            Advanced
          </button>
          <button
            onClick={onClick}
            className="text-[#E4E4E4] border-none bg-[#333333] py-1 px-2 rounded-[8px] font-[500] text-[14px] outline-none"
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};

const CommandModal = ({
  isModalOpen,
  setIsModalOpen,
  setText,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Modal
      closeIcon={<RxCross2 color="#E4E4E4" size={20} />}
      title={
        <div className="flex items-center gap-3">
          <RiSlashCommands2 size={20} color="#F0F0F0" />
          <span className="text-[#Fff] font-[500] text-[14px]">Commands</span>
        </div>
      }
      centered
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      styles={{
        content: {
          backgroundColor: "#282828",
        },
        header: {
          backgroundColor: "#282828",
          color: "#e4e4e4",
        },
      }}
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
    >
      <div className="flex flex-col gap-3 mt-[2rem]">
        <Commands
          icon={<BiWorld size={15} color="#E4E4E4" />}
          title="WEB SEARCH"
          description="Search Term"
        />
        <Commands
          icon={<FaLink size={15} color="#E4E4E4" />}
          title="INCLUDE URL"
          description="Enter URL"
          onClick={() => {
            setText(
              (prevText) =>
                `${prevText} [include-url: [SOME URL] max_execution_time:300 filter:true store:true]`
            );
          }}
        />
      </div>
    </Modal>
  );
};

export default CommandModal;
