"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { addTaskSchema } from "@/lib/validation/add-task";
import { Button } from "@/components/ui/button";
import useAddTask from "@/hooks/useAddTask";
import { useToast } from "@/components/ui/use-toast";
import useAllUser from "@/hooks/useAllUser";
import AddTaskForm from "@/components/addTaskForm";

type FormData = z.infer<typeof addTaskSchema>;

export default function AddTask() {
  const FORM_ID = "add-task";
  const addTask = useAddTask();
  const allUsers = useAllUser();
  const [file, setFile] = useState<File>();
  const { toast } = useToast();
  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      assignedTo: { value: "", label: "" },
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

  const getList = (): Promise<{ label: string; value: string }> => {
    return new Promise((res) => {
      const users = allUsers.data.users.map((data: any) => ({
        label: data.name,
        value: data._id,
      }));
      res(users);
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-2xl">Add Task</h2>
        <Button form={FORM_ID} type="submit" isLoading={addTask.isLoading}>
          Add Task
        </Button>
      </div>
      <AddTaskForm
        form={form}
        formName={FORM_ID}
        onSubmit={onSubmit}
        getList={getList}
        handleFileChange={(file: File) => setFile(file)}
        file={file}
      />
    </>
  );
}
