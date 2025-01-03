import dynamic from "next/dynamic";

const ChatApp = dynamic(() => import("@/component/ChatApp"), {
  ssr: false,
  // loading: () => (
  //   <div className="flex flex-col min-h-[90vh] bg-[#121212] animate-pulse">
  //     <div className="h-16 bg-gray-800 mb-4"></div>
  //     <div className="flex-1 max-w-5xl mx-auto px-4 space-y-6">
  //       <div className="h-24 bg-gray-800 rounded-lg"></div>
  //       <div className="h-24 bg-gray-800 rounded-lg"></div>
  //     </div>
  //   </div>
  // )
});

const Page = () => {
  return (
    <>
      <ChatApp />
    </>
  );
};

export default Page;
