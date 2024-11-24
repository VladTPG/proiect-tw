"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <AppSidebar />
        <main>
            <SidebarTrigger
              className="m-6"
              aria-label="Toggle Sidebar"
            />
            {children}
        </main>
    </SidebarProvider>
  );
}
