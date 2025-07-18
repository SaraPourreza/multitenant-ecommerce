import React from "react";
import {
  Sheet,
  SheetContent,

  SheetHeader,
  SheetTitle,

} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}
interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto pb-2 h-full">
          {items.map((item) => (
            <Link 
            key={item.href}
             href={item.href}
             className="text-left flex w-full p-4 hover:bg-black hover:text-white items-center font-medium text-base"
             onClick={() => onOpenChange(false)}
             >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            <Link href="/sign-in" className="text-left flex w-full p-4 hover:bg-black hover:text-white items-center font-medium text-base">log in</Link>
             <Link href="/sign-up" className="text-left flex w-full p-4 hover:bg-black hover:text-white items-center font-medium text-base">Start selling</Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
