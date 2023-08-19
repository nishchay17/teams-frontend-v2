import { useQuery } from "react-query";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";

async function fetchAllArchiveTasks({ queryKey }: { queryKey: string[] }) {
  const [_, pageNo, perPage] = queryKey;
  const userData = await getSession();
  return (
    await fetch(
      `${apiLinks.archiveTasks}?pageNo=${pageNo}&perPage=${perPage}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userData?.user.token}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        signOut();
      }
      return res;
    })
  ).json();
}

export default function useArchiveTasks(
  pageNo: number = 0,
  perPage: number = 10
) {
  return useQuery({
    queryKey: ["all-archive-tasks", pageNo.toString(), perPage.toString()],
    queryFn: fetchAllArchiveTasks,
    keepPreviousData: true,
  });
}
