"use client"
import { FC } from "react";
import "../login.css";
import Input from "@/components/Input";
import Button from "@/components/Button";

const Login: FC = ({}) => {
  return (
    <section className="p-10 flex flex-col justify-between h-full w-full">
      <h1 className="text-2xl tracking-wide text-left font-semibold">Log In</h1>
      <div className="flex flex-col gap-10 items-center">
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="john.doe@email.com"
          handleChange={() => {}}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="***********"
          handleChange={() => {}}
        />
        <span className="flex gap-3 self-start ml-20 items-center">
          <input
            id="checkbox"
            className="accent-purple-400 focus:outline-none bg-white w-4 h-4 p-10 "
            type="checkbox"
          />
          <label
            htmlFor="checkbox"
            className="text-md text-slate-600 self-start"
          >
            Keep me logged in
          </label>
        </span>
        <Button
          text="Login"
          onClick={()=>{}}
        />
      </div>
      <h1 className="text-left">
        Not a Member Yet? <span className="underline">Sign Up Now</span>
      </h1>
    </section>
  );
};

export default Login;
