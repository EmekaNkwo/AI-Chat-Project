"use client";
import React, { useState } from "react";
import { Button, Layout, Menu, Progress } from "antd";
import { bottomSidebarItems, topSidebarItems } from "@/shared/constant";
import IconLogo from "@/assets/IconLogo";
import { MdAdd } from "react-icons/md";
const { Sider } = Layout;

const Sidebar = (): JSX.Element => {
  const handleMenuClick = (key: string) => {
    setSelectedKeys([key]);
  };

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <div className="w-[350px] flex flex-col justify-between h-full border-r-[1px] border-[#202020]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 p-[1.5rem]">
          <IconLogo />
          <span className=" mt-[0.5rem] p-3 bg-[#2AABBC] flex items-center gap-2 font-[600] rounded-[100px] text-[14px] text-[#2D2D2D]">
            <MdAdd /> New Chat
          </span>
        </div>

        <Menu
          onClick={({ key }) => handleMenuClick(key)}
          mode="inline"
          style={{
            backgroundColor: "#121212",
          }}
          selectedKeys={selectedKeys}
        >
          {topSidebarItems.map((item) => {
            if (item.children) {
              return (
                <Menu.SubMenu
                  className="text-white my-[1rem] "
                  key={item.key}
                  title={
                    <span className="flex gap-4 items-center text-white">
                      {item.icon}
                      {item.title}
                    </span>
                  }
                >
                  {item.children.map((child) => (
                    <Menu.Item key={child.key}>
                      <span className="text-white ">{child.title}</span>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            }
            return (
              <Menu.Item className="text-[14px] my-[2rem]" key={item.key}>
                <span className="flex gap-4 items-center text-white">
                  {item.icon}
                  {item.title}
                </span>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
      <div className="mb-[2rem]">
        <div className="bg-[#202020] m-3 rounded-[8px] mb-[1rem]">
          <div className="flex justify-between items-center p-3">
            <div className="flex flex-col gap-1">
              <span className="text-[#E4E4E4] text-[14px]">
                125,000 token left
              </span>
              <span className="text-[#666666] text-[12px]">~145,000 words</span>
            </div>
            <Progress
              type="dashboard"
              percent={20}
              showInfo={false}
              size={25}
              trailColor="#2F2F2F"
              strokeColor={"#2AABBC"}
              className="transform rotate-90"
            />
          </div>
          <div className="bg-[#282828] text-[12px] p-3 rounded-b-[8px]">
            <span className="text-[#8E8E8E]">See My Plan</span>
          </div>
        </div>
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
