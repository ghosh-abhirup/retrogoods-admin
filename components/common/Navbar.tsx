"use client";

import React, { useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import useUserStore from "@/store/UserStore";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/UserServices";

const Navbar = () => {
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
      {!pathname.includes("login") && !pathname.includes("register") && (
        <div className="w-full py-4 px-3 flex items-center justify-between">
          <p className="font-semibold text-xl md:text-2xl">Retrogoods Admin</p>

          <div className="flex-1 flex justify-end items-center gap-4">
            {user && (
              <>
                <p className="font-medium">Products</p>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger>Open</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
