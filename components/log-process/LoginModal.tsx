"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useLoginStore from "@/store/LoginStore";
import FormikForm from "../common/Forms/FormikForm";
import * as Yup from "yup";
import FormSubmit from "../common/Forms/FormSubmit";
import FormInput from "../common/Forms/FormInput";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/LoginProcessServices";
import useUserStore from "@/store/UserStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AxiosResponseHeaders } from "axios";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required").label("email"),
  password: Yup.string().required("Password is required").label("password"),
});

const LoginModal = () => {
  const { openRegisterModal, closeLoginModal } = useLoginStore();
  const { setUser } = useUserStore();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (payload: Object) => loginUser(payload),

    mutationKey: ["loginUser"],
    onSuccess: (res) => {
      setUser(res.data.data);
      toast.success("Successfully logged in!", { duration: 2000 });
      closeLoginModal();
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
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login to your account</DialogTitle>
          <DialogDescription>
            If you don't have an account,{" "}
            <span
              onClick={() => {
                closeLoginModal();
                openRegisterModal();
              }}
              className="font-medium text-blue-400 cursor-pointer"
            >
              sign in
            </span>
          </DialogDescription>
        </DialogHeader>

        <FormikForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
          <div className="flex flex-col items-center gap-4">
            <FormInput type="email" name="email" placeholder="Email" />
            <FormInput type="password" name="password" placeholder="Password" />

            <FormSubmit isLoading={loginMutation.isPending}>Login</FormSubmit>
          </div>
        </FormikForm>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
