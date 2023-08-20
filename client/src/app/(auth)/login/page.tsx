"use client";
import { FC } from "react";
import "../login.css";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { LoginSchemaResolver } from "@/services/FormSchema";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Login: FC = ({ }) => {

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: LoginSchemaResolver });

  const router = useRouter()

  const onSubmit = (data: any) => {
    axios
      .post("http://localhost:8080/auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        res.data.token = undefined;
        localStorage.setItem("user", JSON.stringify(res.data))
        router.push("/home")
      })
      .catch((error) => {
        toast.error(error.response.data);
      });

  }

  return (
    <section className="p-10 flex flex-col justify-between h-full w-full">
      <h1 className="text-2xl tracking-wide text-left font-semibold">Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 items-center">
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="john.doe@email.com"
          handleChange={() => { }}
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
          handleChange={() => { }}
          extraCss="!w-full"
          parentPosition="!items-start"
          register={register}
          error={errors}
        />
        <Button text="Login" width="!w-full" />
      </form>
      <h1 className="text-left">
        Not a Member Yet? <span className="underline">Sign Up Now</span>
      </h1>
    </section>
  );
};

export default Login;
