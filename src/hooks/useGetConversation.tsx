import { getChat } from "@/lib/api/chat";
import { IConversation } from "@/lib/types/chat";
import { useQuery } from "@tanstack/react-query";

export default function useGetConversation(convId: string) {
  const { data, isLoading } = useQuery<{
    success: boolean;
    conversation: IConversation;
  }>({
    queryKey: ["chat", convId],
    queryFn: () => getChat(convId || ""),
    enabled: !!convId,
  });

  return { data, isLoading };
}
