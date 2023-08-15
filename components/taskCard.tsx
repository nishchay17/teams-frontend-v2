import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Links } from "@/config/links";
import { Skeleton } from "./ui/skeleton";

export interface IListItem {
  _id: string;
  updatedAt?: string;
  name: string;
  description: string;
  className?: string;
  isLoading: boolean;
}

export default function TaskCard({
  name,
  description,
  className,
  _id,
  isLoading,
}: IListItem) {
  const router = useRouter();
  if (isLoading) {
    return (
      <div className={"bg-background border p-3 select-none rounded"}>
        <Skeleton className="mb-2 text-xs">Name loading</Skeleton>
        <Skeleton className="h-3 mb-1">Description loading</Skeleton>
        <Skeleton className="h-3">Description loading</Skeleton>
      </div>
    );
  }
  return (
    <div
      onClick={() => router.push(`${Links.task.href}/${_id}`)}
      className={cn(
        "bg-background border py-2 px-3 select-none rounded",
        className
      )}
    >
      <p className="mb-1 text-sm font-medium line-clamp-2">{name}</p>
      <p className="text-xs opacity-90 line-clamp-3">{description}</p>
    </div>
  );
}
