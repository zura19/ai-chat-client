const api = import.meta.env.VITE_SERVER_API_URL;

export async function askQuestion(prompt: string) {
  //   await new Promise((res) => setTimeout(res, 2000));

  //   console.log("Prompt:", prompt);
  //   console.log("API:", api);

  const res = await fetch(`${api}/chat/gemini`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);

  return data;
}

export async function getChats() {
  const res = await fetch(`${api}/chat/gemini`, {
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);

  return data;
}

export async function getChat(id: string) {
  const res = await fetch(`${api}/chat/gemini/${id}`, {
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);

  return data;
}
