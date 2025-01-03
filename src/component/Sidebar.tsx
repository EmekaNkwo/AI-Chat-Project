"use client";
import React, { useState } from "react";
import { Menu } from "antd";
import { bottomSidebarItems } from "@/shared/constant";

import { MdAdd } from "react-icons/md";
import { Conversations } from "@ant-design/x";

const Sidebar = (): JSX.Element => {
  const handleMenuClick = (key: string) => {
    setSelectedKeys([key]);
  };

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <div className="w-[350px] flex flex-col justify-between h-full border-r-[1px] border-[#202020]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 p-[1.5rem]">
          <div className=" mt-[0.5rem] p-3 bg-[#2AABBC] flex items-center justify-center gap-1 cursor-pointer rounded-[100px] t text-[#2D2D2D]">
            <MdAdd size={20} />
            <span className="text-[14px]  font-[500]">New Chat</span>
          </div>
        </div>
        <div className="">
          <Conversations
            items={[]}
            defaultActiveKey="item1"
            className="w-full"
          />
        </div>
      </div>
      <div className="mb-[2rem]">
        <hr className="border-[1px] border-[#202020] my-[1rem]" />
        <Menu
          onClick={({ key }) => handleMenuClick(key)}
          mode="inline"
          style={{
            backgroundColor: "#121212",
          }}
          selectedKeys={selectedKeys}
        >
          {bottomSidebarItems.map((item) => {
            return (
              <Menu.Item className="text-[14px]  my-[4rem]" key={item.key}>
                <span className="flex gap-4 items-center text-white">
                  {item.icon}
                  {item.title}
                </span>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
