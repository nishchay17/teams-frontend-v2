import { useMutation } from "react-query";
import { z } from "zod";

import { apiLinks } from "@/config/api-links";
import { userSignupSchema } from "@/lib/validation/signup";

type userSignup = z.infer<typeof userSignupSchema>;

async function signupUser(user: userSignup) {
  return (
    await fetch(apiLinks.signup, {
      body: JSON.stringify(user),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
  ).json();
}

export default function useSignup() {
  return useMutation(signupUser);
}
