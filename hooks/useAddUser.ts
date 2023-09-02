import { useMutation } from "react-query";
import { z } from "zod";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";
import { addUserSchema } from "@/lib/validation/add-user";

type AddUserType = z.infer<typeof addUserSchema>;

async function createUserJoining(email: AddUserType) {
  const userData = await getSession();
  return (
    await fetch(apiLinks.addUser, {
      body: JSON.stringify(email),
      method: "POST",
      headers: {
        Authorization: `Bearer ${userData?.user.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 401) {
        signOut();
      }
      return res;
    })
  ).json();
}

export default function useAddUser() {
  return useMutation(createUserJoining);
}
