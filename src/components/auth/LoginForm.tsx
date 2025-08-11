"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/Button";
import TextInput from "../ui/TextInput";
import AuthFormWrapper from "./AuthFormWrapper";
import FormError from "../shared/FormError";
import FormSucess from "../shared/FormSuccess";

import { signinSchema, SigninValues } from "@/lib/validators";
import { signin } from "@/actions/signin";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";

export default function LoginForm() {
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  )
};

export function LoginFormContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params?.get('callbackUrl') || DEFAULT_SIGNIN_REDIRECT;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signinHandler = async (values: SigninValues) => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const res = await signin(values);
      if(res.success) {
        setSuccess(res.message);
        router.push(callbackUrl);
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError("Something went wrong!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
        
      <form onSubmit={handleSubmit(signinHandler)} className="space-y-6">
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

        {success && <FormSucess message={success} />}
        {error && <FormError message={error} />}

        <Button type="submit" variant="gradient" className="w-full" isLoading={isLoading} loadingText="Signing in...">
          Sign in
        </Button>
      </form>
    </AuthFormWrapper>
  );
}
