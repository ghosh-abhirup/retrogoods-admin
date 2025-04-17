"use client";
import React, { ReactNode } from "react";
import Navbar from "@/components/common/Navbar";
import { Toaster } from "react-hot-toast";
import TanstackProvider from "@/components/TanstackProvider";
import useUserStore from "@/store/UserStore";
import Loader from "./Loader";

const Main = ({ children }: { children: ReactNode }) => {
  const { isLoader } = useUserStore();
  return (
    <>
      {isLoader && <Loader />}
      <TanstackProvider>
        <Navbar />
        {children}
        <Toaster />
      </TanstackProvider>
    </>
  );
};

export default Main;
