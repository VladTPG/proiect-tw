"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { usePathname } from "next/navigation";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { UserProvider } from "@/contexts/UserContext";
import { TokenProvider } from "@/contexts/TokenContext";

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
      <UserProvider>
    <TokenProvider>
        <ProjectProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <SidebarTrigger className="m-6" aria-label="Toggle Sidebar" />
              {children}
            </main>
          </SidebarProvider>
        </ProjectProvider>
    </TokenProvider>
      </UserProvider>
  );
}
