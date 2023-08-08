"use client";

import AddUserDialog from "@/components/addUserDialog";
import AllUsers from "@/components/allUsers";
import { Button } from "@/components/ui/button";

export default function ManageUsers() {
  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-2xl">Manage Users</h2>
        <AddUserDialog />
      </div>
      <AllUsers />
    </>
  );
}
