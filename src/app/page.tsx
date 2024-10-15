"use client";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/chat");
  }, [router]);
  return (
    <div className="flex items-center justify-center mt-[2rem]">
      <Spin className=" mx-auto mt-[2rem]" size="large" />
    </div>
  );
}
