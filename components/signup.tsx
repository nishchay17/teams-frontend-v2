"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

type FormData = z.infer<typeof userSignupSchema>;

function Signup() {
  const form = useForm<FormData>({
    defaultValues: {
      email: "",
      mobile: "",
      name: "",
      password: "",
      passwordRecheck: "",
      joiningKey: "",
    },
    resolver: zodResolver(userSignupSchema),
  });

  async function onSubmit(data: FormData) {
    console.log({ data });
  }

  return (
    <div className="flex justify-center items-center my-auto">
      <div className="w-full sm:w-[450px] rounded border py-3 px-4">
        <h1 className="text-xl mb-2 mt-3 font-medium text-center">
          Signup Your Account
        </h1>
        <p className="mb-9 text-center text-sm text-slate-400">
          Using the Invite key you got
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
                      autoComplete="disable"
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
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modile Number</FormLabel>
                  <FormControl>
                    <Input type="tel" autoComplete="disable" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="disable" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="joiningKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="disable" {...field} />
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

export default Signup;
