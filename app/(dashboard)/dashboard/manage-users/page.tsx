import { Button } from "@/components/ui/button";

export default function ManageUsers() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl mb-4">Manage Users</h2>
        <Button form="add-task" type="submit">
          Add User
        </Button>
      </div>
    </>
  );
}
