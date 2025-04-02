"use client";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useLoginStore from "@/store/LoginStore";
import FormikForm from "../common/Forms/FormikForm";
import FormSubmit from "../common/Forms/FormSubmit";
import FormInput from "../common/Forms/FormInput";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/LoginProcessServices";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { AxiosResponseHeaders } from "axios";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("Firstname"),
  lastname: Yup.string().required().label("Lastname"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

const RegisterModal = () => {
  const { openLoginModal, closeRegisterModal, isRegisterModalOpen } = useLoginStore();

  const registerMutation = useMutation({
    mutationFn: (payload: Object) => registerUser(payload),

    mutationKey: ["registerUser"],
    onSuccess: (res) => {
      closeRegisterModal();
      toast.success("Successfully registered!", { duration: 2000 });
      openLoginModal();
    },
    onError: (error: AxiosResponseHeaders) => {
      toast.error(error.response.data.message, { duration: 2000 });
    },
  });

  const onSubmitHandler = (values: Object) => {
    registerMutation.mutate(values);
  };

  return (
    <Dialog open={isRegisterModalOpen} onOpenChange={closeRegisterModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to your account</DialogTitle>
          <DialogDescription>
            Already have an account,{" "}
            <span
              onClick={() => {
                closeRegisterModal();
                openLoginModal();
              }}
              className="font-medium cursor-pointer text-blue-400"
            >
              login
            </span>
          </DialogDescription>
        </DialogHeader>

        <FormikForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
          <div className="flex flex-col items-center gap-4">
            <FormInput type="text" name="firstname" placeholder="First Name" />
            <FormInput type="text" name="lastname" placeholder="Last Name" />
            <FormInput type="email" name="email" placeholder="Email" />
            <FormInput type="password" name="password" placeholder="Password" />

            <FormSubmit isLoading={registerMutation.isPending}>Sign In</FormSubmit>
          </div>
        </FormikForm>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
