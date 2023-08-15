import { useMutation } from "react-query";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";

async function updateTask({ id, type }: { id: string; type: string }) {
  const userData = await getSession();
  const statusToApi: { [key: string]: string } = {
    inprogress: apiLinks.taskInProcess,
    new: apiLinks.taskAssigned,
    complete: apiLinks.taskCompleted,
  };
  return (
    await fetch(`${statusToApi[type]}${id}`, {
      method: "GET",
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

export default function useTaskStatusUpdate() {
  return useMutation(updateTask);
}
