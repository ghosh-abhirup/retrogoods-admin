"use client";

import { Sidebar, SidebarContent, SidebarGroupLabel, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { MdOutlineDashboard } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import useUserStore from "@/store/UserStore";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/UserServices";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: MdOutlineDashboard,
  },
  {
    title: "Products",
    url: "/products",
    icon: FiBox,
  },
];

const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, showLoader, hideLoader } = useUserStore();
  const accessToken = Cookies.get("accessToken");

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!accessToken && !user,
  });

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
      return;
    }

    if (isPending) {
      showLoader();
      return;
    } else {
      hideLoader();
    }

    if (!user && !data && !pathname.includes("login") && !pathname.includes("register")) {
      router.push("/login");
      return;
    }

    if (isSuccess && data && !user) {
      console.log("setting user from API");
      setUser(data);
    }
  }, [isPending, isSuccess, data, user]);

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
