import { getChats } from "@/lib/api/chat";
import { IChat, IConversation } from "@/lib/types/chat";
import { useAppSelector } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

export default function Sidebar() {
  const user = useAppSelector((state) => state.user.user);
  const { data, isLoading } = useQuery<
    | { success: boolean; chats: IConversation[] }
    | { message: string; success: boolean }
  >({
    queryKey: ["questions", user?.id],
    queryFn: () => getChats(),
  });

  console.log(data);

  if (!data) {
    return (
      <aside className="bg-sidebar divide-y h-full py-4 overflow-scroll ">
        <p className="text-sm text-center">Loading...</p>
      </aside>
    );
  }

  if (data && "message" in data) {
    return (
      <aside className="bg-sidebar divide-y h-full py-4 overflow-scroll ">
        {/* <p className="text-sm text-center">{data?.message}</p> */}
      </aside>
    );
  }

  const showChats = !isLoading && data?.chats?.length > 0;

  return (
    <aside className="bg-sidebar divide-y h-full py-4 overflow-scroll ">
      {isLoading && <p className="text-sm text-center">Loading...</p>}
      {data?.chats?.length === 0 && <div></div>}

      {showChats &&
        data?.chats?.map((group) => (
          <div key={group.id}>
            <p className="text-xs text-muted-foreground px-2 py-2">
              {group.date}
            </p>
            {group?.messages?.map((chat: IChat) => (
              <Question
                id={group.id}
                key={chat?.id}
                questionId={chat?.id}
                question={chat?.text}
                // reply={chat.replay}
              />
            ))}
          </div>
        ))}
    </aside>
  );
}

export function Question({
  id,
  questionId,
  question,
}: // reply,
{
  id: string;
  questionId: string;
  question: string;
  // reply: string;
}) {
  // active = bg-sidebar-accent

  const [searchParams, setSearchParams] = useSearchParams();

  const activeClass =
    searchParams.get("c") === id + "-" + questionId
      ? "bg-sidebar-accent hover:bg-sidebar"
      : "bg-sidebar hover:bg-sidebar-accent";

  const handleClick = (id: string) => {
    const existingC = searchParams.get("c");

    if (existingC === id + "-" + questionId) {
      searchParams.delete("c");
      setSearchParams(searchParams);
      return;
    }
    searchParams.set("c", id + "-" + questionId);
    setSearchParams(searchParams);
  };

  return (
    <div
      onClick={() => handleClick(id)}
      className={`bg-sidebar ml-auto px-3 py-4 cursor-pointer hover:bg-sidebar-accent ${activeClass} transition-all duration-300`}
    >
      <p className="text-sm line-clamp-1">{question} </p>
      {/* <p className="text-sm text-muted-foreground line-clamp-1">{reply}</p> */}
    </div>
  );
}
