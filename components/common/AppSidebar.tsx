"use client";

import { Sidebar, SidebarContent, SidebarGroupLabel, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { MdOutlineDashboard } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import useUserStore from "@/store/UserStore";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: MdOutlineDashboard,
  },
  {
    title: "Products",
    url: "/product",
    icon: FiBox,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const { user } = useUserStore();

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div>
            <p className="font-bold text-xl">RetroGoods</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            {/* <SidebarGroupLabel></SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname.includes(item.url)}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {user && (
          <SidebarFooter>
            <SidebarMenuItem>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <SidebarMenuButton asChild>
                    <a>
                      <FaUserCircle />
                      <span>
                        {user.firstname} {user.lastname}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </HoverCardTrigger>
                <HoverCardContent className="w-60">
                  <div>
                    <SidebarMenuButton asChild>
                      <a>
                        <IoSettingsOutline />
                        <span>Profile</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuButton asChild>
                      <a>
                        <IoMdLogOut />
                        <span>Logout</span>
                      </a>
                    </SidebarMenuButton>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </SidebarMenuItem>
          </SidebarFooter>
        )}
      </Sidebar>
    </>
  );
};

export default AppSidebar;
