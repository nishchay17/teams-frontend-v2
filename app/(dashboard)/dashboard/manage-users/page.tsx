"use client";

import { Button } from "@/components/ui/button";
import UserDialog from "@/components/user-dialog";

function UserProfileCard({
  username,
  total,
  completed,
  inprogress,
}: {
  username: string;
  total: number;
  inprogress: number;
  completed: number;
}) {
  return (
    <div className="bg-secondary rounded py-3 px-4 cursor-pointer">
      <h4 className="mb-2">{username}</h4>
      <p className="text-sm">Total Tasks: {total}</p>
      <p className="text-sm">Completed Tasks: {completed}</p>
      <p className="text-sm">In progress Tasks: {inprogress}</p>
      <UserDialog username={username} />
    </div>
  );
}

export default function ManageUsers() {
  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-2xl">Manage Users</h2>
        <Button form="add-task" type="submit">
          Add User
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        <UserProfileCard
          username="Nishchay"
          total={10}
          completed={6}
          inprogress={4}
        />
        <UserProfileCard
          username="Nishchay1"
          total={10}
          completed={6}
          inprogress={4}
        />
        <UserProfileCard
          username="Nishchay2"
          total={10}
          completed={6}
          inprogress={4}
        />
        <UserProfileCard
          username="Nishchay4"
          total={10}
          completed={6}
          inprogress={4}
        />
        <UserProfileCard
          username="Nishchay3"
          total={10}
          completed={6}
          inprogress={4}
        />
        <UserProfileCard
          username="Nishchay"
          total={10}
          completed={6}
          inprogress={4}
        />
      </div>
    </>
  );
}
