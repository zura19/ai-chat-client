import { askQuestion } from "@/lib/api/chat";
import { useMutation } from "@tanstack/react-query";

export default function useSentMessage() {
  const {
    data,
    isPending,
    isError,
    isSuccess,
    mutateAsync: sentMessage,
  } = useMutation({
    mutationFn: async (prompt: string) => {
      const data = await askQuestion(prompt);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { data, isPending, isError, isSuccess, sentMessage };

  //   async function sendMessage() {}
}
