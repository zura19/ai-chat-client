export interface IChat {
  id: string;
  text: string;
  sender: "user" | "model";
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IConversation {
  id: string;
  date: string;
  messages: IChat[];
  createdAt: string;
  updatedAt: string;
}
