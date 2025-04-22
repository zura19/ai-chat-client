import { RegisterSchemaType } from "@/lib/zod";
// import { setUser } from "@/slices/userSlice";
// import { useAppDispatch } from "@/store";
import { toast } from "sonner";

const api = import.meta.env.VITE_SERVER_API_URL;

export default function useRegister() {
  //   const dispatch = useAppDispatch();
  async function register(values: RegisterSchemaType) {
    const res = await fetch(`${api}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
    if (data.success) {
      //   localStorage.setItem("user", JSON.stringify(data.user));
      //   dispatch(setUser(data.user));
      toast.success("Sign up successful");
    } else {
      toast.error(data.message || "Something went wrong");
      return { error: data.message || "Something went wrong" };
    }
  }
  return { register };
}
