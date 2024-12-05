"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { usePathname } from "next/navigation";
import { ProjectProvider } from "@/contexts/ProjectContext";

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <ProjectProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col w-full">
          <SidebarTrigger className="m-6" aria-label="Toggle Sidebar" />
          {children}
        </main>
      </SidebarProvider>
    </ProjectProvider>
  );
}
