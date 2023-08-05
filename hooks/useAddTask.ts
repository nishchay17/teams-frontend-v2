import { useMutation } from "react-query";
import { z } from "zod";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";
import { addTaskSchema } from "@/lib/validation/add-task";

type Task = z.infer<typeof addTaskSchema>;

async function createTerm(task: Task) {
  const userData = await getSession();
  const formData: FormData = Object.keys(task).reduce(
    (formData: FormData, currentKey) => {
      formData.append(currentKey, task[currentKey as keyof Task]);
      return formData;
    },
    new FormData()
  );
  return (
    await fetch(apiLinks.addTask, {
      body: formData,
      method: "POST",
      headers: {
        Authorization: `Bearer ${userData?.user.token}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        signOut();
      }
      return res;
    })
  ).json();
}

export default function useAddTask() {
  return useMutation(createTerm);
}
