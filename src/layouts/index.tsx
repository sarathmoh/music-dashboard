import SideBar from "./sidebar";
import Content from "./content";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="lg:hidden bg-white p-4 flex items-center justify-between shadow-md">
        <div className="w-8 h-8 bg-emerald-200 rounded-md"></div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SideBar />
          </SheetContent>
        </Sheet>
      </header>
      <div className="flex min-h-screen">
        <aside className="hidden lg:block  bg-white shadow-md">
          <SideBar />
        </aside>
        <Content />
      </div>
    </div>
  );
};

export default Layout;
