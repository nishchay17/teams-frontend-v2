"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn as nextSignIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { userSigninSchema } from "@/lib/validation/signin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Links } from "@/config/links";

type FormData = z.infer<typeof userSigninSchema>;

function Signin() {
  const session = useSession();
  if (session.status === "authenticated") {
    redirect(Links.task.href);
  }
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const form = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(userSigninSchema),
  });

  async function onSubmit(data: FormData) {
    const signinRes = await nextSignIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: searchParams?.get("from") || Links.task.href,
    });
    if (!!signinRes?.error) {
      toast({
        title: "Error in signin",
        description: signinRes.error,
      });
    }
  }

  return (
    <div className="flex justify-center items-center my-auto">
      <div className="w-full sm:w-[450px] rounded border py-3 px-4">
        <h1 className="text-xl mb-2 mt-3 font-medium text-center">
          Login to Your Account
        </h1>
        <p className="mb-9 text-center text-sm text-slate-400">
          Collaboration starts now
        </p>
        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example.com"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full mt-4" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Signin;
