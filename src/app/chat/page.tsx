import dynamic from "next/dynamic";

const ChatApp = dynamic(() => import("@/component/ChatApp"), {
  ssr: false,
});
const Page = () => {
  return (
    <>
      <ChatApp />
    </>
  );
};

export default Page;
