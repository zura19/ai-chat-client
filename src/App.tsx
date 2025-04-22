import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// import { useAppSelector } from "./store";
// import { Route } from "lucide-react";

function App() {
  // const { user } = useAppSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="grid md:grid-cols-[15fr_80fr]  h-dvh divide-x">
              <div className="hidden md:block">
                <Sidebar />
              </div>
              <main className="">
                <Navbar />
                <div className="flex items-center justify-center h-fit pt-8">
                  <Chat />
                </div>
              </main>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
