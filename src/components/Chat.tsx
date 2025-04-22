import { useEffect, useRef, useState } from "react";
import ChatText from "./ChatText";
import { useSearchParams } from "react-router";
import useChat from "@/hooks/useChat";
import ChatForm from "./ChatForm";
import useGetConversation from "@/hooks/useGetConversation";

export default function Chat() {
  const [searchParams] = useSearchParams();
  const convId = searchParams.get("c")?.split("-")[0];
  const [isFocused, setIsFocused] = useState(false);

  const { msgs } = useChat();
  const { data, isLoading } = useGetConversation(convId || "");

  const msgRef = useRef<Record<string, HTMLDivElement | null>>({});
  const targetId = searchParams.get("c")?.split("-")[1] || null;

  useEffect(() => {
    if (targetId && msgRef.current[targetId]) {
      msgRef.current[targetId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [targetId, isLoading]);

  return (
    <div className="flex flex-col  gap-5  p-4 bg-sidebar size-[650px] relative rounded-md  ">
      <div
        className={`absolute inset-0 pointer-events-none w-full h-full   -z-10 transition-all duration-700  ease-[cubic-bezier(0.25,0.8,0.25,1)] bg-primary shadow-xl shadow-accent 
      ${isFocused ? "scale-[1.008] opacity-100" : "  scale-100 opacity-0"}
    `}
        style={{
          transitionProperty: "all, border-radius, transform, opacity",
          borderRadius: isFocused ? "10px " : "50%",
        }}
      />

      <ul className="overflow-y-scroll h-full flex  flex-col-reverse">
        {isLoading && <p className="text-center">loading</p>}
        {!isLoading && searchParams.get("c")
          ? data?.conversation.messages.map((message, index) => (
              <div
                className={``}
                ref={(el) => {
                  msgRef.current[message.id] = el;
                }}
                key={message.id}
              >
                <ChatText
                  key={index + "user"}
                  who={message.sender}
                  text={message.text}
                />
              </div>
            ))
          : msgs?.map((message, index) => (
              <div key={index}>
                <ChatText
                  key={index + "user"}
                  who={message?.sender === "user" ? "user" : "model"}
                  text={message.text as string}
                />
              </div>
            ))}
      </ul>

      <ChatForm
        handleBlur={() => setIsFocused(false)}
        handleFocus={() => setIsFocused(true)}
        isLoading={isLoading}
      />
    </div>
  );
}
