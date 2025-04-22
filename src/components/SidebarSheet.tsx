import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { PanelLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

export default function SidebarSheet() {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [searchParams]);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild className="md:hidden ">
        <Button variant="ghost" size={"icon"} className="">
          <PanelLeft size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-sidebar w-[220px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Sidebar className="pt-0" />
      </SheetContent>
    </Sheet>
  );
}
