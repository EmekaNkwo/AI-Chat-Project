import { Avatar } from "antd";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Topbar = () => {
  return (
    <div className="z-10  flex justify-between items-center text-[#fff] border-b-[2px] p-4 border-[#202020]">
      <div className=""></div>
      <div className="flex items-center gap-[4rem]">
        {["Dashboard", "My Apps", "App Store"].map((item, index) => (
          <span
            className="text-[#E4E4E4] font-[500] text-[14px] cursor-pointer"
            key={index}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Avatar style={{ backgroundColor: "#2AABBC", color: "#121212" }}>
          AP
        </Avatar>
        <IoMdArrowDropdown />
      </div>
    </div>
  );
};

export default React.memo(Topbar);
