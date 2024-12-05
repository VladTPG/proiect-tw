import {
  Calendar,
  CheckSquare,
  Folder,
  Gauge,
  LogOut,
  Mail,
  Settings,
} from "lucide-react";
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
import { useUser } from "@/contexts/UserContext";
import { useToken } from "@/contexts/TokenContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AppSidebar() {
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();
  const router = useRouter();

  const handleLogout = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("http://localhost:8000/auth/logout", user, config)
      .then(() => {
        setToken(null);
        setUser(null);
        router.push("/");
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  return (
    <Sidebar className="w-64 h-screen">
      <SidebarHeader>
        <Select40 />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/dashboard"
                    className="flex items-center space-x-2 p-2 rounded-md"
                  >
                    <Gauge className="h-5 w-5" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/projects"
                    className="flex items-center space-x-2 p-2 rounded-md"
                  >
                    <Folder className="h-5 w-5" />
                    <span>Projects</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/tasks"
                    className="flex items-center space-x-2 p-2 rounded-md"
                  >
                    <CheckSquare className="h-5 w-5" />
                    <span>Tasks</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/calendar"
                    className="flex items-center space-x-2 p-2 rounded-md"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Calendar</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/invitations"
                    className="flex items-center space-x-2 p-2 rounded-md"
                  >
                    <Mail className="h-5 w-5" />
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
              <a
                href="/accountsettings"
                className="flex items-center space-x-2 p-2 rounded-md"
              >
                <Settings className="h-5 w-5" />
                <span>Account settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              onClick={handleLogout}
              className="hover:cursor-pointer hover:bg-red-500 hover:text-white"
            >
              <a className="flex items-center space-x-2 p-2 rounded-md">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
