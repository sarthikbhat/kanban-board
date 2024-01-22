'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import API_UTIL from '@/services/ApiUtil';
import { SignUpFormSchemaResolver } from '@/services/FormSchema';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../login.css';

export interface IForm {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const Login: FC = ({}) => {
  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors }
  } = useForm({ mode: 'onTouched', resolver: SignUpFormSchemaResolver });

  const [apiCalled, setapiCalled] = useState(false);
  const router = useRouter();

  const onSubmit = (data: any) => {
    const formData = data as IForm;
    delete formData.confirmPassword;
    API_UTIL.post('/auth/register', formData).then((res) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', res.data.token);
        res.data.token = undefined;
        window.localStorage.setItem('user', JSON.stringify(res.data));
        router.push('/home');
      }
    });
  };

  useEffect(() => {
    if (errors && errors['confirmpassword']?.type == 'oneOf')
      setError('password', {
        type: 'manual',
        message: 'Passwords do not match'
      });
  }, [errors, setError]);

  useEffect(() => {
    reset({
      confirmpassword: '',
      email: '',
      fullName: '',
      password: '',
      userName: ''
    });
    setapiCalled(false);
  }, [apiCalled, reset]);

  return (
    <section className="p-10 flex flex-col justify-between h-full w-full">
      <h1 className="text-xl tracking-wide text-left font-semibold">Sign Up</h1>
      <form className="flex flex-col gap-8 items-center" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          extraCss="!w-full !p-2 !text-xs"
          parentPosition="!items-start text-sm"
          error={errors}
          control={control}
        />
        <Input
          id="userName"
          label="UserName"
          type="text"
          placeholder="JohnDoe29"
          extraCss="!w-full !p-2 !text-xs"
          parentPosition="!items-start text-sm"
          error={errors}
          control={control}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="john.doe@email.com"
          extraCss="!w-full !p-2 !text-xs"
          parentPosition="!items-start text-sm"
          error={errors}
          control={control}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="***********"
          extraCss="!w-full !p-2 !text-xs"
          parentPosition="!items-start text-sm"
          error={errors}
          control={control}
        />
        <Input
          id="confirmpassword"
          label="Confirm Password"
          type="password"
          placeholder="***********"
          extraCss="!w-full !p-2 !text-xs"
          parentPosition="!items-start text-sm"
          error={errors}
          control={control}
        />
        <Button text="Register" width="!w-full !p-2 text-sm" />
      </form>
      <h1 className="text-left text-sm">
        Already a member?{' '}
        <span className="underline cursor-pointer" onClick={() => router.push('/login')}>
          log In Now
        </span>
      </h1>
    </section>
  );
};

export default Login;
