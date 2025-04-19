"use client";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import TanstackProvider from "@/components/TanstackProvider";
import useUserStore from "@/store/UserStore";
import Loader from "./Loader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { usePathname } from "next/navigation";

const Main = ({ children }: { children: ReactNode }) => {
  const { isLoader } = useUserStore();
  const pathname = usePathname();

  return (
    <>
      {isLoader && <Loader />}
      <TanstackProvider>
        <SidebarProvider>
          {!pathname.includes("login") && !pathname.includes("register") && <AppSidebar />}
          <main className="w-full ">
            {!pathname.includes("login") && !pathname.includes("register") && <SidebarTrigger />}

            {children}
          </main>
        </SidebarProvider>
        <Toaster />
      </TanstackProvider>
    </>
  );
};

export default Main;
