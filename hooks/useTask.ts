import { useQuery } from "react-query";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";

async function fetchTaskById({ queryKey }: { queryKey: string[] }) {
  const userData = await getSession();
  const [_, id] = queryKey;
  return (
    await fetch(`${apiLinks.getTask}${id}`, {
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

export const getTaskKey = (id: string): string[] => ["task", id];

export default function useFetchTaskById(id: string) {
  return useQuery(getTaskKey(id), fetchTaskById);
}
