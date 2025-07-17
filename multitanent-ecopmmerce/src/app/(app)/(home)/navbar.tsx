"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavbarSidebar } from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";

const popins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}
const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:text-white hover:bg-black"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};
const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen,setIsSidebarOpen]=useState(false)
  return (
    <nav className="flex justify-between h-20 border-b font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", popins.className)}>
          foundRoad
        </span>
      </Link>
      <NavbarSidebar
      items={navbarItems}
      open={isSidebarOpen} 
      onOpenChange={setIsSidebarOpen}/>

      <div className="items-center hidden gap-4 lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
        <div className="hidden lg:flex">
          <Button
            asChild
            variant="secondary"
            className="border-l border-t-0 border-b-0 border-r-0 px-12 rounded-none h-full bg-white hover:bg-pink-400 transition-colors text-lg"
          >
            <Link prefetch href="/sign-in"> Log in</Link>
          </Button>
          <Button
            asChild
            className="border-l border-t-0 border-b-0 border-r-0 px-12 rounded-none h-full bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
          >
            <Link href="/sign-up"> Start Selling</Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center lg:hidden">
        <Button
         variant="ghost" 
         className="size-12 bg-white border-transparent"
         onClick={() => setIsSidebarOpen(true)}>
          <MenuIcon /> 
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
