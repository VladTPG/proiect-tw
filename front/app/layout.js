"use client";

import "./globals.css";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { UserProvider } from "@/contexts/UserContext";
import { TokenProvider } from "@/contexts/TokenContext";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("dark");

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Task Tracker</title>
      </head>
      <body className={`antialiased ${theme}`}>
        <UserProvider>
          <TokenProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className={"fixed top-5 right-5"}>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {children}
          </TokenProvider>
        </UserProvider>
      </body>
    </html>
  );
}
