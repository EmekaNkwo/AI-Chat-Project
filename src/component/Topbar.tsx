import React from "react";
import { BsChatSquareText } from "react-icons/bs";

const Topbar = () => {
  return (
    <div className="z-10 flex justify-center items-center text-[#fff] border-b-[2px] p-4 border-[#202020]">
      <div className="flex items-center gap-[0.5rem]">
        <BsChatSquareText size={25} />
        <span className="text-[18px] font-[600]">AI Chat</span>
      </div>
    </div>
  );
};

export default React.memo(Topbar);
