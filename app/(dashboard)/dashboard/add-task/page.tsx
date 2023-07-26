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

type FormData = z.infer<typeof addTaskSchema>;

export default function AddTask() {
  const [fileError, setFileError] = useState<string>("");
  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      assignedTo: "",
      description: "",
    },
    resolver: zodResolver(addTaskSchema),
  });

  async function onSubmit(data: FormData) {
    console.log({ data });
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl mb-4">Add Task</h2>
        <Button form="add-task" type="submit">
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
                name="title"
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
              onDrop={(files: FileList) => console.log(files)}
              error={fileError}
            />
          </div>
        </form>
      </Form>
    </>
  );
}
