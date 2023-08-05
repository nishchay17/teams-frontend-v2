import { useQuery } from "react-query";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";

async function fetchAllUsers() {
  const userData = await getSession();
  return (
    await fetch(apiLinks.allUser, {
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

export default function useAllUser() {
  return useQuery("all-user", fetchAllUsers);
}
