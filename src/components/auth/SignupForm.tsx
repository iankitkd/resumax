"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/Button";
import TextInput from "../ui/TextInput";
import AuthFormWrapper from "./AuthFormWrapper";

import { SignupValues, signupSchema } from "@/validators/user";

export default function SignupForm() {

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const signupHandler = () => {
    console.log(getValues())
  };

  return (
    <AuthFormWrapper
      showSocials={true}
      label={"Create an Account"}
      desciption={"Enter your details to get started"}
      backButtonLabel={"Sign in"}
      backButtonDescription={"Already have an account?"}
      backButtonHref={"/login"}
    >
        
      <form onSubmit={handleSubmit(signupHandler)} className="space-y-4">
        <TextInput
          label="Name"
          id="name"
          type="name"
          placeholder="John Doe"
          register={register("name")}
          error={errors.name?.message}
          iconName="user"
          required
        />
        <TextInput
          label="Email"
          id="email"
          type="email"
          placeholder="your@email.com"
          register={register("email")}
          error={errors.email?.message}
          iconName="email"
          required
        />
        <TextInput
          label="Password"
          id="password"
          type="password"
          placeholder="******"
          register={register("password")}
          error={errors.password?.message}
          iconName="lockOutline"
          required
        />

        <Button type="submit" variant="gradient" className="w-full" isLoading={false}>
          Sign up
        </Button>
      </form>
    </AuthFormWrapper>
  );
}
