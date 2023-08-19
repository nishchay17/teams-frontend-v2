import { useQuery, useQueryClient } from "react-query";
import { getSession, signOut } from "next-auth/react";

import { apiLinks } from "@/config/api-links";

async function fetchBucketItems({ queryKey }: { queryKey: string[] }) {
  const userData = await getSession();
  const [_, pageNo, perPage] = queryKey;
  return (
    await fetch(
      `${apiLinks.getBucketItems}?pageNo=${pageNo}&perPage=${perPage}`,
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

const BUCKET_ITEM_KEY = "all-bucket-item";

export default function useBucketItems(
  pageNo: number = 0,
  perPage: number = 10
) {
  const TEN_MINUTE = 600000;
  return useQuery({
    queryKey: [BUCKET_ITEM_KEY, pageNo.toString(), perPage.toString()],
    queryFn: fetchBucketItems,
    keepPreviousData: true,
    staleTime: TEN_MINUTE,
  });
}

export const useInvalidateBucketItems = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: BUCKET_ITEM_KEY });
};
