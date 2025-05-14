"use client";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import useUserStore from "@/store/UserStore";
import Loader from "./Loader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Main = ({ children }: { children: ReactNode }) => {
  useAuth();
  const pathname = usePathname();
  const { isLoader } = useUserStore();

  if (isLoader) {
    return <Loader />;
  }

  if (pathname.includes("login") || pathname.includes("register")) {
    return children;
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full p-6">
          <SidebarTrigger />

          {children}
        </main>
      </SidebarProvider>
      <Toaster />
    </>
  );
};

export default Main;
