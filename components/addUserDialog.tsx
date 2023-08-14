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
import useAddUser from "@/hooks/useAddUser";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

type FormData = z.infer<typeof addUserSchema>;

export default function AddUserDialog() {
  const addUser = useAddUser();
  const [joiningKey, setJoiningKey] = useState<string>();
  const { toast } = useToast();
  const form = useForm<FormData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(addUserSchema),
  });

  function onSubmit(data: FormData) {
    addUser.mutate(data, {
      onError: (error: unknown) => {
        console.error(error);
        toast({
          title: "Error while creating Joining id",
          description: "Please check network connect and try again",
        });
      },
      onSuccess: (data) => {
        toast({
          title: data.status
            ? "Joining id Created"
            : "Error while creating Joining id",
          description: !data.status ? data.message : data.joiningId,
        });
        setJoiningKey(data.joiningId);
        if (!!data.status) {
          form.reset();
        }
      },
    });
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
        {joiningKey && <p>Joining key: {joiningKey}</p>}
        <Button
          isLoading={addUser.isLoading}
          type="submit"
          form="add-user"
          className="w-fit ml-auto"
        >
          Add User
        </Button>
      </DialogContent>
    </Dialog>
  );
}
