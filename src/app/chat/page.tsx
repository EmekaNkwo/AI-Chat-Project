import dynamic from "next/dynamic";

// import ChatApp from "@/component/ChatApp";
const ChatApp = dynamic(() => import("@/component/ChatApp"), {
  ssr: false,
});
const Page = () => {
  return (
    <div>
      <ChatApp />
    </div>
  );
};

export default Page;
