"use client";
import { FC, useEffect, useState } from "react";
import "../login.css";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { SignUpFormSchemaResolver } from "@/services/FormSchema";
import { useRouter } from "next/navigation";
import AUTH_INTERCEPTOR from "@/services/ApiUtil";

export interface IForm {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const Login: FC = ({ }) => {

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: SignUpFormSchemaResolver });

  const [apiCalled, setapiCalled] = useState(false);
  const router = useRouter();

  const onSubmit = (data: any) => {
    const formData = data as IForm;
    delete formData.confirmPassword;
    AUTH_INTERCEPTOR
      .post("/auth/register", formData)
      .then((res) => {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("token", res.data.token)
          res.data.token = undefined;
          window.localStorage.setItem("user", JSON.stringify(res.data))
          router.push("/home")
        }
      });
  };

  useEffect(() => {
    if (errors && errors["confirmpassword"]?.type == "oneOf")
      setError("password", {
        type: "manual",
        message: "Passwords do not match",
      });
  }, [errors, setError]);

  useEffect(() => {
    reset({
      confirmpassword: "",
      email: "",
      fullName: "",
      password: "",
      userName: "",
    });
    setapiCalled(false);
  }, [apiCalled, reset]);

  return (
    <section className="p-10 flex flex-col justify-between h-full w-full">
      <h1 className="text-2xl tracking-wide text-left font-semibold">
        Sign Up
      </h1>
      <form
        className="flex flex-col gap-8 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          extraCss="!w-full"
          parentPosition="!items-start"
          register={register}
          error={errors}
        />
        <Input
          id="userName"
          label="UserName"
          type="text"
          placeholder="JohnDoe29"
          extraCss="!w-full"
          parentPosition="!items-start"
          register={register}
          error={errors}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="john.doe@email.com"
          extraCss="!w-full"
          parentPosition="!items-start"
          register={register}
          error={errors}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="***********"
          extraCss="!w-full"
          parentPosition="!items-start"
          register={register}
          error={errors}
        />
        <Input
          id="confirmpassword"
          label="Confirm Password"
          type="password"
          placeholder="***********"
          extraCss="!w-full"
          parentPosition="!items-start"
          register={register}
          error={errors}
        />
        <Button text="Register" width="!w-full" />
      </form>
      <h1 className="text-left">
        Already a member? <span className="underline">log In Now</span>
      </h1>
    </section>
  );
};

export default Login;
