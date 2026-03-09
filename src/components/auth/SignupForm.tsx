"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/Button";
import TextInput from "../ui/TextInput";
import AuthFormWrapper from "./AuthFormWrapper";
import FormError from "../shared/FormError";
import FormSucess from "../shared/FormSuccess";

import { signupSchema, SignupValues } from "@/lib/validators";
import { signup } from "@/actions/signup";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";

export default function SignupForm() {
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <SignupFormContent />
    </Suspense>
  )
};

export function SignupFormContent() {
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
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const signupHandler = async (values: SignupValues) => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const res = await signup(values);
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
      label={"Create an Account"}
      desciption={"Enter your details to get started"}
      backButtonLabel={"Sign in"}
      backButtonDescription={"Already have an account?"}
      backButtonHref={"/login"}
    >
        
      <form onSubmit={handleSubmit(signupHandler)} className="space-y-6">
        <TextInput
          label="Name"
          id="name"
          type="name"
          register={register("name")}
          error={errors.name?.message}
          iconName="user"
          required
        />
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

        <Button type="submit" variant="gradient" className="w-full" isLoading={isLoading} loadingText="Creating your account...">
          Sign up
        </Button>
      </form>
    </AuthFormWrapper>
  );
}
