"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import FormikForm from "@/components/common/Forms/FormikForm";
import * as Yup from "yup";
import FormSubmit from "@/components/common/Forms/FormSubmit";
import FormInput from "@/components/common/Forms/FormInput";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/LoginProcessServices";
import useUserStore from "@/store/UserStore";
import toast, { Toaster } from "react-hot-toast";
import { AxiosResponseHeaders } from "axios";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required").label("email"),
  password: Yup.string().required("Password is required").label("password"),
});

const LoginPage = () => {
  const { setUser, user, hideLoader } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    hideLoader();
    if (user) {
      router.push("/");
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: (payload: Object) => loginUser(payload),

    mutationKey: ["loginUser"],
    onSuccess: (res) => {
      setUser(res.data.data);
      toast.success("Successfully logged in!", { duration: 2000 });
      router.push("/");
    },
    onError: (error: AxiosResponseHeaders) => {
      toast.error(error.response.data.message, { duration: 2000 });
    },
  });

  const onSubmitHandler = (values: Object) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <div className="">
        <p className="font-semibold text-2xl">Login to your account</p>
        <div className="mt-2">
          If you don't have an account,{" "}
          <span
            onClick={() => {
              router.push("/register");
            }}
            className="font-medium text-blue-400 cursor-pointer"
          >
            sign in
          </span>
        </div>
      </div>

      <FormikForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
        <div className="w-[30vw] flex flex-col items-center gap-4">
          <FormInput type="email" name="email" placeholder="Email" />
          <FormInput type="password" name="password" placeholder="Password" />

          <FormSubmit isLoading={loginMutation.isPending}>Login</FormSubmit>
        </div>
      </FormikForm>
      <Toaster />
    </div>
  );
};

export default LoginPage;
