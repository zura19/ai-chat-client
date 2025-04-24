import { SendHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import useSentMessage from "@/hooks/useSentMessage";
import { useSearchParams } from "react-router";
import useChat from "@/hooks/useChat";
import { toast } from "sonner";
import GeneratingLoader from "./GeneratingLoader";
import { AnimatePresence, motion } from "framer-motion";

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
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [placeholder, setPlaceholder] = useState("Ask AI anything...");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    if (searchParams.get("c")) {
      setPlaceholder("");
      return;
    }

    // prettier-ignore
    const placeholders = ["Ask AI anything...", "What is the meaning of life?", "Tell me a joke", "How does AI work?"];

    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      setPlaceholder(
        placeholders[(placeholderIndex + 1) % placeholders.length]
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [searchParams, placeholderIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputFocused = document.activeElement === inputRef.current;
      if (!isInputFocused) return;
      if (e.key === "Tab" && !e.shiftKey && !isLoading) {
        e.preventDefault();
        setPrompt(placeholder);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLoading, placeholder]);

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
      <form
        onSubmit={handleSubmit}
        className="relative flex gap-5 mt-auto w-full"
      >
        <div className="relative w-full">
          {/* Fake placeholder */}
          {!prompt && !isPending && (
            <AnimatePresence mode="wait">
              <motion.span
                key={placeholder}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.5, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
              >
                {placeholder}
              </motion.span>
            </AnimatePresence>
          )}
          <Input
            ref={inputRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="" // Empty placeholder to let our animated one show
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isPending || isLoading || !!searchParams.get("c")}
            className="relative z-10"
          />
        </div>
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
