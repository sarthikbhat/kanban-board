import { FC } from "react";
import "../login.css";
import Button from "@/components/Button";
import Input from "@/components/Input";

const Login: FC = ({}) => {
  return (
    <section className="p-10 flex flex-col justify-between h-full w-full">
      <h1 className="text-2xl tracking-wide text-left font-semibold">
        Sign Up
      </h1>
      <div className="flex flex-col gap-10 items-center">
        <Input
          id="username"
          label="Full Name"
          type="text"
          placeholder="John Doe"
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="john.doe@email.com"
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="***********"
        />
        <Input
          id="password"
          label="Confirm Password"
          type="password"
          placeholder="***********"
        />
        <Button text="Register" />
      </div>
      <h1 className="text-left">
        Already a member? <span className="underline">log In Now</span>
      </h1>
    </section>
  );
};

export default Login;
