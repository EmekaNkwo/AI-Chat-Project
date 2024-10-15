"use client";
import Sidebar from "@/component/Sidebar";
import Topbar from "@/component/Topbar";
import React from "react";

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex h-screen items-start w-full">
        <Sidebar />
        <div className="flex w-full h-full flex-col">
          <Topbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Template;
