import { useRouter } from "next/navigation";

import { Links } from "@/config/links";
import useAllUser from "@/hooks/useAllUser";
import { Skeleton } from "./ui/skeleton";
import Pagination from "./ui/pagination";
import { useState } from "react";

type UserType = {
  _id: string;
  name: string;
  taskAssigned: any[];
  taskCompleted: any[];
  taskInProgress: any[];
};

function UserProfileCard({
  username,
  total,
  completed,
  inprogress,
  _id,
}: {
  _id: string;
  username: string;
  total: number;
  inprogress: number;
  completed: number;
}) {
  const router = useRouter();
  return (
    <div
      className="bg-secondary rounded pt-3 pb-4 px-4 cursor-pointer"
      onClick={() => router.push(`${Links.manageUser.href}/${_id}`)}
    >
      <h4 className="mb-2">{username}</h4>
      <p className="text-sm">Total Tasks: {total}</p>
      <p className="text-sm">Completed Tasks: {completed}</p>
      <p className="text-sm">In progress Tasks: {inprogress}</p>
    </div>
  );
}

export default function AllUsers() {
  const [pageNo, setPageNo] = useState(0);
  const PER_PAGE = 16;
  const allUsers = useAllUser(pageNo, PER_PAGE);

  function onPageChange({ selected }: { selected: number }) {
    setPageNo(selected);
  }

  if (allUsers.isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {Array(6)
          .fill(1)
          .map((_, i) => (
            <div className="bg-secondary rounded pt-3 pb-4 px-4" key={i}>
              <Skeleton className="mb-3">Loading username</Skeleton>
              <Skeleton className="h-2" />
              <Skeleton className="h-2 my-1" />
              <Skeleton className="h-2" />
            </div>
          ))}
      </div>
    );
  }

  if (allUsers.isError || !allUsers.data.status) {
    return <p>Some error</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {allUsers.data.users.map((data: UserType) => (
          <UserProfileCard
            key={data._id}
            _id={data._id}
            username={data.name}
            total={
              data.taskAssigned.length +
              data.taskInProgress.length +
              data.taskCompleted.length
            }
            completed={data.taskCompleted.length}
            inprogress={data.taskInProgress.length}
          />
        ))}
      </div>
      <Pagination
        className="mt-2 mb-4"
        onPageChange={onPageChange}
        perPage={PER_PAGE}
        totalCount={allUsers.data.pagination.count}
      />
    </>
  );
}
