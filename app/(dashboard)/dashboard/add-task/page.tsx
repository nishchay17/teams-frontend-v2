"use client";

import { useState } from "react";
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
import { addTaskSchema } from "@/lib/validation/add-task";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FileDropzone from "@/components/file-drop-zone";
import useAddTask from "@/hooks/useAddTask";
import { useToast } from "@/components/ui/use-toast";
import Select from "@/components/ui/Select";
import useAllUser from "@/hooks/useAllUser";

type FormData = z.infer<typeof addTaskSchema>;

export default function AddTask() {
  const addTask = useAddTask();
  const allUsers = useAllUser();
  const [file, setFile] = useState<File>();
  const { toast } = useToast();
  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      assignedTo: undefined,
      description: "",
    },
    resolver: zodResolver(addTaskSchema),
  });

  async function onSubmit(data: FormData) {
    addTask.mutate(
      { ...data, file },
      {
        onError: (error: unknown) => {
          console.error(error);
          toast({
            title: "Error while creating Task",
            description: "Please check network connect and try again",
          });
        },
        onSuccess: (data) => {
          toast({
            title: data.status ? "Task Created" : "Error while creating Task",
            description: data.message,
          });
          setFile(undefined);
          form.reset();
        },
      }
    );
  }

  const getList = () => {
    return new Promise((res) => {
      res(
        allUsers.data.users.map((data: any) => ({
          label: data.name,
          value: data._id,
        }))
      );
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl mb-4">Add Task</h2>
        <Button form="add-task" type="submit" isLoading={addTask.isLoading}>
          Add Task
        </Button>
      </div>
      <Form {...form}>
        <form
          id="add-task"
          className="mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex-1 flex gap-4 flex-col">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
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
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <FormControl>
                      <Select defaultOptions loadOptions={getList} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-20 resize-none"
                        autoCapitalize="none"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FileDropzone
              onDrop={(files: FileList) => setFile(files[0])}
              text={file?.name}
            />
          </div>
        </form>
      </Form>
    </>
  );
}
