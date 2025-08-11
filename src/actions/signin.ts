"use server"

import { signIn } from "@/auth";
import { signinSchema, SigninValues } from "@/lib/validators";
import { AuthError } from "next-auth";

export const signin = async (values: SigninValues) => {
  try {
    const validatedFields = signinSchema.safeParse(values);

    if (!validatedFields.success) {
      return { success: false, message: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true, message: "Signed in successfully!" };

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials!" };
        default:
          return { success: false, message: "Something went wrong!" };
      }
    }
    return { success: false, message: "Something went wrong", error: error };
  }
};
