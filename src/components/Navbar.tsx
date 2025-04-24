import { useAppSelector } from "@/store";
import LoginModal from "./LoginModal";
import { useSearchParams } from "react-router";
import SidebarSheet from "./SidebarSheet";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const [, setSearchParams] = useSearchParams();
  const { user } = useAppSelector((state) => state.user);

  return (
    <nav className="bg-sidebar flex   justify-between p-4">
      <h1
        onClick={() => setSearchParams({})}
        className="font-bold text-2xl logo-gradient cursor-pointer "
      >
        AI Chat
      </h1>
      {!user ? (
        <LoginModal />
      ) : (
        <div className="flex items-center gap-1">
          <SidebarSheet />
          <LogoutModal />
        </div>
      )}
    </nav>
  );
}
