"use client";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import UserDialog from "@/components/user-dialog";
import UserDetail from "@/components/userDetail";
import { Links } from "@/config/links";
import useAllUser from "@/hooks/useAllUser";

type Props = {
  params: { id: string };
};

export default function ManageUser({ params }: Props) {
  const ArrowLeft = Icons["arrowLeft"];
  const allUser = useAllUser();
  const currentUser =
    allUser.data?.users?.find(
      ({ _id }: { _id: string }) => _id === params.id
    ) ?? null;

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <Link href={Links.manageUser.href}>
          <Button variant="outline">
            <ArrowLeft size="1rem" className="mr-2" />
            Back
          </Button>
        </Link>
        <UserDialog user={currentUser} isLoading={allUser.isLoading} />
      </div>
      <UserDetail user={currentUser} />
    </>
  );
}
