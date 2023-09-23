"use client";

import AddUserDialog from "@/components/addUserDialog";
import AllUsers from "@/components/allUsers";

export default function ManageUsers() {
  return (
    <>
      <div className="flex sm:justify-between sm:items-center flex-col sm:flex-row mb-7 gap-4">
        <h2 className="text-2xl">Manage Users</h2>
        <AddUserDialog />
      </div>
      <AllUsers />
    </>
  );
}
