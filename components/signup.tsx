"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { userSignupSchema } from "@/lib/validation/signup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSignup from "@/hooks/useSignin";
import { useToast } from "./ui/use-toast";
import { Links } from "@/config/links";

type FormData = z.infer<typeof userSignupSchema>;

function Signup() {
  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      password: "",
      passwordRecheck: "",
      joiningId: "",
    },
    resolver: zodResolver(userSignupSchema),
  });
  const signin = useSignup();
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(data: FormData) {
    console.log(data);
    if (data.password !== data.passwordRecheck) {
      toast({
        title: "Passwords don't match",
        description: "Please check passwords again",
      });
      return;
    }
    signin.mutate(data, {
      onError: (error: unknown) => {
        console.error(error);
        toast({
          title: "Error while sign-up",
          description: "Please check network connect and try again",
        });
      },
      onSuccess: (data) => {
        console.log({ data });
        toast({
          title: data.status ? "Signed-up, redirecting" : "Error while signup",
          description: data.message,
        });
        if (!!data.status) {
          form.reset();
          setTimeout(() => {
            router.push(Links.signin.href);
          }, 1000);
        }
      },
    });
  }

  return (
    <div className="flex justify-center items-center my-auto sm:pt-16 pt-0">
      <div className="w-full sm:w-[450px] rounded border py-3 px-4">
        <h1 className="text-xl mb-2 mt-3 font-medium text-center">
          Signup Your Account
        </h1>
        <p className="mb-9 text-center text-sm text-slate-400">
          Using the Invite key you got
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="disable"
                      id="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="joiningId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Joining Key</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="disable"
                      id="joining-id"
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
                    <Input type="password" autoComplete="disable" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordRecheck"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Password Again</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="disable" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-4"
              type="submit"
              isLoading={signin.isLoading}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
