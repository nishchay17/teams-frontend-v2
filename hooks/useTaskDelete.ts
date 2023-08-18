import { useMutation } from "react-query";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";

async function deleteTask(id: string) {
  const userData = await getSession();
  return (
    await fetch(`${apiLinks.taskDelete}${id}`, {
      method: "DELETE",
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

export default function useTaskDelete() {
  return useMutation(deleteTask);
}
