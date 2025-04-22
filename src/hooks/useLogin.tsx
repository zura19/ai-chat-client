import { LoginSchemaType } from "@/lib/zod";
import { setUser } from "@/slices/userSlice";
import { useAppDispatch } from "@/store";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const api = import.meta.env.VITE_SERVER_API_URL;

export default function useLogin() {
  const navigate = useNavigate();
  // const s = router;
  const dispatch = useAppDispatch();
  async function login(values: LoginSchemaType) {
    const res = await fetch(`${api}/auth/login`, {
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
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/", { replace: true });
      dispatch(setUser(data.user));
      toast.success("Login successful");
    } else {
      toast.error(data.message || "Something went wrong");
      return { success: false };
    }
    return { success: true };
  }
  return { login };
}
