"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Links } from "@/config/links";
import useFetchTaskById from "@/hooks/useTask";
import { Icons } from "@/components/icons";
import useAllUser from "@/hooks/useAllUser";
import { addTaskSchema } from "@/lib/validation/add-task";
import { useToast } from "@/components/ui/use-toast";
import AddTaskForm from "@/components/addTaskForm";
import { useInvalidateMyUser } from "@/hooks/useMyUser";
import useEditTask from "@/hooks/useEditTask";
import useArchiveTask from "@/hooks/useArchiveTask";

type FormData = z.infer<typeof addTaskSchema>;
type Props = {
  params: { id: string };
};

export default function Task({ params: { id } }: Props) {
  const ArrowLeft = Icons["arrowLeft"];
  const task = useFetchTaskById(id);
  const FORM_ID = "edit-task";
  const editTask = useEditTask();
  const archiveTask = useArchiveTask();
  const allUsers = useAllUser();
  const invalidateMyUser = useInvalidateMyUser();
  const [file, setFile] = useState<File>();
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(addTaskSchema),
  });

  useEffect(() => {
    if (!task.isLoading && task.data.status) {
      form.reset({
        name: task.data.task.name,
        description: task.data.task.description,
        assignedTo: {
          value: task.data.task.assignedTo._id,
          label: task.data.task.assignedTo.name,
        },
        file: "",
      });
    }
  }, [task.isLoading]);

  async function onSubmit(data: FormData) {
    editTask.mutate(
      { ...data, file, id },
      {
        onError: (error: unknown) => {
          console.error(error);
          toast({
            title: "Error while editing Task",
            description: "Please check network connect and try again",
          });
        },
        onSuccess: (data) => {
          toast({
            title: data.status ? "Task Edited" : "Error while editing Task",
            description: data.message,
          });
          invalidateMyUser();
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

  if (task.isLoading) {
    return <>loading</>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <Link href={Links.task.href}>
          <Button variant="outline">
            <ArrowLeft size="1rem" className="mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <Button
            className="mr-2"
            variant="secondary"
            onClick={() => archiveTask.mutate(id)}
          >
            Archive
          </Button>
          <Button
            form={FORM_ID}
            type="submit"
            isLoading={editTask.isLoading}
            disabled={!(form.formState.isDirty || isImageChanged)}
          >
            Save edit
          </Button>
        </div>
      </div>
      <AddTaskForm
        form={form}
        formName={FORM_ID}
        onSubmit={onSubmit}
        getList={getList}
        handleFileChange={(file?: File) => {
          setFile(file);
          setIsImageChanged(!!file);
        }}
        file={file}
      />
      {task.data.task.file && (
        <>
          <p className="mt-3 mb-1">Attachment</p>
          <Image
            alt={"attachment for task"}
            src={task.data.task.file}
            width="320"
            height="180"
          />
        </>
      )}
    </>
  );
}
