"use client";
import React, { ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import useUserStore from "@/store/UserStore";
import Loader from "./Loader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { useRouter } from "next/navigation";
import { getUser } from "@/services/UserServices";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const Main = ({ children }: { children: ReactNode }) => {
  const { isLoader, setUser, user } = useUserStore();

  const accessToken = Cookies.get("accessToken");
  const router = useRouter();

  const { data, isPending } = useQuery({
    queryKey: ["get-user"],
    queryFn: getUser,
    enabled: !!accessToken && !user,
  });

  useEffect(() => {
    if (data && !user) {
      setUser(data);
    }
  }, [data]);

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken]);

  if (isPending && !user) {
    return <Loader />;
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
