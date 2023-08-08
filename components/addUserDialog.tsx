"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addUserSchema } from "@/lib/validation/add-user";

type FormData = z.infer<typeof addUserSchema>;

export default function AddUserDialog() {
  const form = useForm<FormData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(addUserSchema),
  });

  function onSubmit(data: FormData) {
    console.log({ data });
  }

  return (
    <Dialog>
      <DialogTrigger
        onClick={() => form.reset()}
        className={cn(buttonVariants())}
      >
        Add User
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adding new user</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Email of the person you want to add
        </DialogDescription>
        <Form {...form}>
          <form id="add-user" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      autoCapitalize="none"
                      autoCorrect="off"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button type="submit" form="add-user" className="w-fit ml-auto">
          Add User
        </Button>
      </DialogContent>
    </Dialog>
  );
}
