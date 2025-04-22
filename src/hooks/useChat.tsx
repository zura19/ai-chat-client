import { useAppSelector } from "@/store";
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client"; // Adjust the import path as needed

const socketUrl = import.meta.env.VITE_SERVER_API_URL.split("/api")[0];

interface Imessage {
  text: string;
  type: "user" | "model";
  sender: "user" | "model";
  createdAt: Date;
}

function useChat() {
  const { user } = useAppSelector((state) => state.user);
  const [messages, setMessages] = useState<Imessage[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(socketUrl, {
      query: { userId: user?.id },
    });

    socketRef.current.on("connect", () => {
      console.log("Socket.IO connected");
      // Optionally send user identification to the server upon connection
      // if you need to track specific users per socket
    });

    socketRef.current.on("userMessage", (message: Imessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, type: "user" },
      ]);
    });

    socketRef.current.on("botResponse", (response) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...response, type: "model" },
      ]);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user?.id]);

  const sendMessage = (text: string) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("userMessage", { text });
    }
  };

  return {
    msgs: messages.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }),
    sendMessage,
  };
}

export default useChat;
