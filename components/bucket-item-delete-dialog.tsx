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
import { useToast } from "@/components/ui/use-toast";
import { Links } from "@/config/links";
import { useInvalidateBucketItems } from "@/hooks/useBucketItems";
import useDeleteBucket from "@/hooks/useDeleteBucket";

export default function BucketItemDeleteDialog({
  bucketItem,
  isLoading,
}: {
  bucketItem?: {
    name: string;
    _id: string;
  };
  isLoading: boolean;
}) {
  const Loader = Icons["loader"];
  const deteleBucket = useDeleteBucket();
  const { toast } = useToast();
  const invalidateBucketItems = useInvalidateBucketItems();
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({ variant: "danger" }))}
        disabled={isLoading}
      >
        Delete this item
        {isLoading && <Loader size={"1rem"} />}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This will <strong>permanetly delete</strong> bucket item:{" "}
          {bucketItem?.name}
        </DialogDescription>
        <Button
          variant="danger"
          className="w-fit ml-auto"
          isLoading={deteleBucket.isLoading}
          onClick={() =>
            bucketItem?._id
              ? deteleBucket.mutate(bucketItem?._id, {
                  onSuccess: (data) => {
                    toast({
                      title: data.status
                        ? "Bucket item deleted, redirecting"
                        : "Error while deleting bucket item",
                      description: data.message,
                    });
                    invalidateBucketItems();
                    setTimeout(() => {
                      router.push(Links.bucket.href);
                    }, 1000);
                  },
                  onError: () => {
                    toast({
                      title: "Error while deleting Bucket item",
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
