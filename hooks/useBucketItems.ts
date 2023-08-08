import { useQuery, useQueryClient } from "react-query";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";

async function fetchBucketItems() {
  const userData = await getSession();
  return (
    await fetch(apiLinks.getBucketItem, {
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

const BUCKET_ITEM_KEY = "all-bucket-item";

export default function useBucketItems() {
  const TEN_MINUTE = 600000;
  return useQuery(BUCKET_ITEM_KEY, fetchBucketItems, { staleTime: TEN_MINUTE });
}

export const useInvalidateBucketItems = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: BUCKET_ITEM_KEY });
};
