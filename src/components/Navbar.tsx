import { useAppSelector } from "@/store";
import LoginModal from "./LoginModal";
import useLogout from "@/hooks/useLogout";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router";
import SidebarSheet from "./SidebarSheet";

export default function Navbar() {
  const [, setSearchParams] = useSearchParams();

  const { user } = useAppSelector((state) => state.user);
  const { logout } = useLogout();
  return (
    <nav className="bg-sidebar flex   justify-between p-4">
      <h1
        onClick={() => setSearchParams({})}
        className="font-bold text-2xl logo-gradient cursor-pointer "
      >
        ZMAI
      </h1>
      {!user ? (
        <LoginModal />
      ) : (
        <div className="flex items-center gap-1">
          <SidebarSheet />
          <Button
            variant={"ghost"}
            className="flex items-center gap-4"
            onClick={logout}
          >
            logout
          </Button>
        </div>
      )}
    </nav>
  );
}
