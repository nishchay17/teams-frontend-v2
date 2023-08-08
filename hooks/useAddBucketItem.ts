import { useMutation } from "react-query";
import { z } from "zod";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";
import { addBucketSchema } from "@/lib/validation/add-bucket";

type BucketItem = z.infer<typeof addBucketSchema>;

async function createBucketItem(bucketItem: BucketItem) {
  const userData = await getSession();
  const formData: FormData = Object.keys(bucketItem).reduce(
    (formData: FormData, currentKey: string) => {
      formData.append(
        currentKey,
        bucketItem[currentKey as keyof BucketItem] as string
      );
      return formData;
    },
    new FormData()
  );
  return (
    await fetch(apiLinks.addBucketItem, {
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

export default function useAddBucketItem() {
  return useMutation(createBucketItem);
}
