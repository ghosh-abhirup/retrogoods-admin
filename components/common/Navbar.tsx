"use client";

import React, { useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import UserLogProcess from "./UserLogProcess";
import useUserStore from "@/store/UserStore";
import useLoginStore from "@/store/LoginStore";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/UserServices";

const Navbar = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const { openLoginModal } = useLoginStore();
  const accessToken = Cookies.get("accessToken");

  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!accessToken && !user,
  });

  useEffect(() => {
    if (!user) {
      openLoginModal();
    } else {
      if (data) {
        setUser(data);
      }
    }
  }, [user, data]);

  return (
    <div className="w-full py-4 px-3 flex items-center justify-between">
      <p className="font-semibold text-xl md:text-2xl">Retrogoods Admin</p>

      <div className="flex items-center gap-4">
        {user && (
          <>
            <p className="font-medium">Products</p>
            <p className="font-medium">Orders</p>
          </>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <UserLogProcess />
    </div>
  );
};

export default Navbar;
