export default function ChatText({
  who,
  text,
}: {
  who: "user" | "model";
  text: string;
}) {
  if (who === "user") {
    console.log("text", text);
    return (
      <div className="bg-accent w-[80%] ml-auto p-4 rounded-md h-fit">
        <p className="text-sm">{text}</p>
      </div>
    );
  }

  if (who === "model") {
    return (
      <div className=" p-4 rounded-md h-fit">
        <p className="text-sm">{text}</p>
      </div>
    );
  }
}
