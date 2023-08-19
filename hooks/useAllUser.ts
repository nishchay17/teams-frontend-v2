import { useQuery } from "react-query";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";

async function fetchAllUsers({ queryKey }: { queryKey: string[] }) {
  const userData = await getSession();
  const [_, pageNo, perPage] = queryKey;
  return (
    await fetch(`${apiLinks.allUser}?pageNo=${pageNo}&perPage=${perPage}`, {
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

export default function useAllUser(pageNo: number = 0, perPage: number = 16) {
  return useQuery({
    queryKey: ["all-user", pageNo.toString(), perPage.toString()],
    queryFn: fetchAllUsers,
    keepPreviousData: true,
  });
}
