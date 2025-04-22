import { SendHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import useSentMessage from "@/hooks/useSentMessage";
import { useSearchParams } from "react-router";
import useChat from "@/hooks/useChat";
import { toast } from "sonner";
import GeneratingLoader from "./GeneratingLoader";

export default function ChatForm({
  handleBlur,
  handleFocus,
  isLoading = false,
}: {
  handleBlur: () => void;
  handleFocus: () => void;
  isLoading?: boolean;
}) {
  const [searchParams] = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const { sentMessage, isPending } = useSentMessage();

  const { sendMessage } = useChat();
  const [placeholder, setPlaceholder] = useState("Ask AI anything...");

  useEffect(() => {
    if (searchParams.get("c")) return;
    const arr = [
      "Ask AI anything...",
      "What is the meaning of life?",
      "Tell me a joke",
      "How does AI work?",
    ];
    setInterval(() => {
      setPlaceholder(arr[Math.floor(Math.random() * arr.length)]);
    }, 5000);

    return () => clearInterval(0);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(prompt);
    const data = await sentMessage(prompt);

    if (!data.success) {
      toast.error(data.message || "Something went wrong");
      return;
    }

    setPrompt("");
    handleBlur();
  };

  return (
    <>
      {isPending && <GeneratingLoader backgroundColor="" />}

      <form onSubmit={handleSubmit} className="flex gap-5 mt-auto">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={isPending ? "Loading..." : placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className=""
          disabled={isPending || isLoading || !!searchParams.get("c")}
        />
        <Button
          variant={"secondary"}
          disabled={!prompt || isPending}
          size={"icon"}
        >
          <SendHorizontal />
        </Button>
      </form>
    </>
  );
}
