import { useQuery, useQueryClient } from "react-query";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";

async function fetchMyUser() {
  const userData = await getSession();
  return (
    await fetch(apiLinks.myUser, {
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

export const MY_USER_KEY = "my-user";

export default function useMyUser() {
  const FIVE_MINUTE = 300000;
  return useQuery(MY_USER_KEY, fetchMyUser, { staleTime: FIVE_MINUTE });
}

export const useInvalidateMyUser = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: MY_USER_KEY });
};
