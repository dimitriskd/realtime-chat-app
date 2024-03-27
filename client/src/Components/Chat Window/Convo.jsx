import { useRef, useEffect } from "react";
import { SentBubble, ReceivedBubble } from "./Bubble";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

export default function Convo() {
  const chatContainerRef = useRef(null); // Ref for the conversation container
  const chat = {
    username: "Dimitris",
    timestamp: "2 hours ago",
    message: "Sorry I wasn't available earlier. What's up?",
  };

  useEffect(() => {
    // Scroll the conversation container to the bottom when component updates
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  });

  return (
    <section className="h-full">
      <ChatHeader />
      <div
        ref={chatContainerRef}
        className="flex flex-col overflow-auto w-full h-full scrollbar chat-container py-3 scrollbar"
      >
        {[...Array(20)].map((_, index) => (
          <ReceivedBubble key={index} data={chat} />
        ))}
        <SentBubble data={chat} />
        {[...Array(20)].map((_, index) => (
          <ReceivedBubble key={index} data={chat} />
        ))}
        <SentBubble data={chat} />
      </div>
      <ChatInput />
    </section>
  );
}
