import {Calendar, CheckSquare, Folder, Gauge, LogOut, Mail, Settings} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Select40 from "@/components/dropdownSelector";

export default function AppSidebar() {
    return (
        <Sidebar className="w-64 h-screen">

            <SidebarHeader>
                <Select40></Select40>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/dashboard" className="flex items-center space-x-2 p-2 rounded-md">
                                        <Gauge className="h-5 w-5"/>
                                        <span>Dashboard</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/projects" className="flex items-center space-x-2 p-2 rounded-md">
                                        <Folder className="h-5 w-5"/>
                                        <span>Projects</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/tasks" className="flex items-center space-x-2 p-2 rounded-md">
                                        <CheckSquare className="h-5 w-5"/>
                                        <span>Tasks</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/calendar" className="flex items-center space-x-2 p-2 rounded-md">
                                        <Calendar className="h-5 w-5"/>
                                        <span>Calendar</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/invitations" className="flex items-center space-x-2 p-2 rounded-md">
                                        <Mail className="h-5 w-5"/>
                                        <span>Invitations</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>


                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="/settings" className="flex items-center space-x-2 p-2 rounded-md">
                                <Settings className="h-5 w-5"/>
                                <span>Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>


                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="/logout" className="flex items-center space-x-2 p-2 rounded-md">
                                <LogOut className="h-5 w-5"/>
                                <span>Logout</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
