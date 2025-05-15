"use client";
import React, { useEffect } from "react";
import FormikForm from "@/components/common/Forms/FormikForm";
import FormSubmit from "@/components/common/Forms/FormSubmit";
import FormInput from "@/components/common/Forms/FormInput";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/LoginProcessServices";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { AxiosResponseHeaders } from "axios";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/UserStore";

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

const RegisterPage = () => {
  const router = useRouter();
  const { user, hideLoader } = useUserStore();

  useEffect(() => {
    hideLoader();
    if (user) {
      router.push("/");
    }
  }, []);

  const registerMutation = useMutation({
    mutationFn: (payload: Object) => registerUser(payload),

    mutationKey: ["registerUser"],
    onSuccess: (res) => {
      toast.success("Successfully registered!", { duration: 2000 });
      router.push("/login");
    },
    onError: (error: AxiosResponseHeaders) => {
      toast.error(error.response.data.message, { duration: 2000 });
    },
  });

  const onSubmitHandler = (values: Object) => {
    registerMutation.mutate(values);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <div>
        <p className="font-semibold text-2xl">Sign in to your account</p>
        <div>
          Already have an account,{" "}
          <span
            onClick={() => {
              router.push("/login");
            }}
            className="font-medium cursor-pointer text-blue-400"
          >
            login
          </span>
        </div>
      </div>

      <FormikForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
        <div className="w-[30vw] flex flex-col items-center gap-4">
          <FormInput type="text" name="firstname" placeholder="First Name" />
          <FormInput type="text" name="lastname" placeholder="Last Name" />
          <FormInput type="email" name="email" placeholder="Email" />
          <FormInput type="password" name="password" placeholder="Password" />

          <FormSubmit isLoading={registerMutation.isPending}>Sign In</FormSubmit>
        </div>
      </FormikForm>

      <Toaster />
    </div>
  );
};

export default RegisterPage;
