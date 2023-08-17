import { useQuery } from "react-query";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";

async function fetchBucketItem({ queryKey }: { queryKey: string[] }) {
  const userData = await getSession();
  const [_, id] = queryKey;
  return (
    await fetch(`${apiLinks.getBucketItem}${id}`, {
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

const getBucketItemKey = (id: string) => ["bucket-item", id];

export default function useBucketItem(id: string) {
  const TEN_MINUTE = 600000;
  return useQuery(getBucketItemKey(id), fetchBucketItem, {
    staleTime: TEN_MINUTE,
  });
}
