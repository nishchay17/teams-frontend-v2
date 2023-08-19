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
  priority: string;
}

export default function TaskCard({
  name,
  description,
  className,
  _id,
  isLoading,
  priority,
}: IListItem) {
  const router = useRouter();
  const priorityColor: { [key: string]: string } = {
    high: "bg-red-500",
    medium: "bg-orange-400",
    low: "bg-green-400",
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          "bg-background border p-3 select-none rounded shadow-sm",
          className
        )}
      >
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
        "bg-background border p-3 select-none rounded shadow-sm cursor-pointer",
        className
      )}
    >
      <div className="flex justify-between items-start mb-2 gap-1">
        <p className="text-sm font-medium line-clamp-2 capitalize">{name}</p>
        <p
          className={cn(
            "text-xs w-fit px-2 py-[0.15rem] rounded-md capitalize text-black font-medium",
            priorityColor[priority]
          )}
        >
          {priority}
        </p>
      </div>
      <p className="text-xs opacity-90 line-clamp-3 capitalize">
        {description}
      </p>
    </div>
  );
}
