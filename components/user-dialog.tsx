"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";

export default function UserDialog({
  user,
  isLoading,
}: {
  user?: {
    name: string;
    _id: string;
  };
  isLoading: boolean;
}) {
  const Loader = Icons["loader"];
  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({ variant: "danger" }))}
        disabled={isLoading}
      >
        Detele User
        {isLoading && <Loader size={"1rem"} />}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This will <strong>permanetly delete</strong> user: {user?.name}
        </DialogDescription>
        <Button variant="danger" className="w-fit ml-auto">
          Yes, delete this
        </Button>
      </DialogContent>
    </Dialog>
  );
}
