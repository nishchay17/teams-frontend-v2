import { useMutation } from "react-query";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";

async function archiveTerm(id: string) {
  const userData = await getSession();
  return (
    await fetch(`${apiLinks.archiveTask}${id}`, {
      method: "PUT",
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

export default function useArchiveTask() {
  return useMutation(archiveTerm);
}
