'use client';
import { FC } from 'react';
import '../login.css';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { LoginSchemaResolver } from '@/services/FormSchema';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import API_UTIL from '@/services/ApiUtil';
import React from 'react';

const Login: FC = ({}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({ mode: 'onTouched', resolver: LoginSchemaResolver });

  const router = useRouter();

  const onSubmit = (data: any) => {
    API_UTIL.post('/auth/login', data).then((res) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', res.data.token);
        res.data.token = undefined;
        window.localStorage.setItem('user', JSON.stringify(res.data));
        router.push('/home');
      }
    });
  };

  return (
    <section className="p-10 flex flex-col justify-between h-full w-full">
      <h1 className="text-xl tracking-wide text-left font-semibold">Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 items-center">
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="john.doe@email.com"
          control={control}
          extraCss="!w-full !p-2 !text-xs"
          parentPosition="!items-start !text-sm"
          error={errors}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control={control}
          placeholder="***********"
          extraCss="!w-full !p-2 !text-xs"
          parentPosition="!items-start !text-sm"
          error={errors}
        />
        <Button text="Login" width="!w-full !p-2 !text-sm" />
      </form>
      <h1 className="text-left !text-sm">
        Not a Member Yet?{' '}
        <span className="underline cursor-pointer" onClick={() => router.push('/register')}>
          Sign Up Now
        </span>
      </h1>
    </section>
  );
};

export default Login;
