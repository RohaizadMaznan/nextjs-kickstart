import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FULL_SIDEBAR } from "@/constants/sidebar";
import { ChevronDown } from "lucide-react";

export default function LeftSidebar() {
  const items = FULL_SIDEBAR.flatMap((group) => group.items);

  return (
    <div className="h-[calc(100vh-30px)] w-[300px] bg-sidebar-accent">
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger render={<SidebarMenuButton />}>
                  Select Workspace
                  <ChevronDown className="ml-auto" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <span>Acme Inc</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>{item.name}</SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
