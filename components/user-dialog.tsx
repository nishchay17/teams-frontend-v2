"use client";

import { useRouter } from "next/navigation";

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
import useDeleteUser from "@/hooks/useDeleteUser";
import { useToast } from "@/components/ui/use-toast";
import { useInvalidateMyUser } from "@/hooks/useMyUser";
import { Links } from "@/config/links";

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
  const deteleUser = useDeleteUser();
  const { toast } = useToast();
  const invalidateMyUser = useInvalidateMyUser();
  const router = useRouter();

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
        <Button
          variant="danger"
          className="w-fit ml-auto"
          onClick={() =>
            user?._id
              ? deteleUser.mutate(user?._id, {
                  onSuccess: (data) => {
                    toast({
                      title: data.status
                        ? "User Deleted, redirecting"
                        : "Error while deleting user",
                      description: data.message,
                    });
                    invalidateMyUser();
                    setTimeout(() => {
                      router.push(Links.manageUser.href);
                    }, 1000);
                  },
                  onError: () => {
                    toast({
                      title: "Error while deleting User",
                      description: "Please check network connect and try again",
                    });
                  },
                })
              : null
          }
        >
          Yes, delete this
        </Button>
      </DialogContent>
    </Dialog>
  );
}
