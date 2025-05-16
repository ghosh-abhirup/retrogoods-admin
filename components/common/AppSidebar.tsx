"use client";

import { Sidebar, SidebarContent, SidebarGroupLabel, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { MdOutlineDashboard } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import useUserStore from "@/store/UserStore";
import { useEffect } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/services/LoginProcessServices";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

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
  const { user, setUser } = useUserStore();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationKey: ["logout-user"],
    mutationFn: logoutUser,
    onSuccess: () => {
      setUser(null);
      toast.success("Successfully logged out", { duration: 2000 });
      router.push("/login");
    },
    onError: () => {
      toast.error("Error logging out", { duration: 2000 });
    },
  });

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
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
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
                      <p onClick={() => logoutMutation.mutate()}>
                        {logoutMutation.isPending ? <LoadingSpinner /> : <IoMdLogOut />}
                        <span>Logout</span>
                      </p>
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
