'use client'

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import {usePathname} from "next/navigation";

export default function Layout({children}) {
    const pathname = usePathname();

    return (
        <SidebarProvider>
            <AppSidebar/>
            <main>
                <SidebarTrigger
                    className="relative top-5 left-5 mb-5"
                    aria-label="Toggle Sidebar"
                />
                <div className="path-name-display">
                    Current Path: {pathname}
                </div>
                {children}
            </main>
        </SidebarProvider>
    );
}
