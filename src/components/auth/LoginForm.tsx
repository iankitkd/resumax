"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/Button";
import TextInput from "../ui/TextInput";
import AuthFormWrapper from "./AuthFormWrapper";

import { signinSchema, SigninValues } from "@/validators/user";

export default function LoginForm() {

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginHandler = () => {
    console.log(getValues())
  };

  return (
    <AuthFormWrapper
      showSocials={true}
      label={"Welcome Back"}
      desciption={"Sign in to continue"}
      backButtonLabel={"Sign up"}
      backButtonDescription={"Don't have a account?"}
      backButtonHref={"/signup"}
    >
        
      <form onSubmit={handleSubmit(loginHandler)} className="space-y-6">
        <TextInput
          label="Email"
          id="email"
          type="email"
          register={register("email")}
          error={errors.email?.message}
          iconName="email"
          required
        />
        <TextInput
          label="Password"
          id="password"
          type="password"
          register={register("password")}
          error={errors.password?.message}
          iconName="lockOutline"
          required
        />

        <Button type="submit" variant="gradient" className="w-full" isLoading={false}>
          Sign in
        </Button>
      </form>
    </AuthFormWrapper>
  );
}
