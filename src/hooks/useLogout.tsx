import { removeUser } from "@/slices/userSlice";
import { useAppDispatch } from "@/store";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
const api = import.meta.env.VITE_SERVER_API_URL;

export default function useLogout() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  function handleLogout() {
    setSearchParams({});
    navigate("/", { replace: true });
  }

  const dispatch = useAppDispatch();

  async function logout() {
    const res = await fetch(`${api}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();

    if (!data.success) {
      console.log("error");
      toast.error(data.message || "Something went wrong");
      return { error: data.message || "Something went wrong" };
    }

    localStorage.removeItem("user");
    dispatch(removeUser());
    toast.success("Logout successful");
    handleLogout();
  }
  return { logout };
}
