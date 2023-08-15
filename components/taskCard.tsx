import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Links } from "@/config/links";

export interface IListItem {
  _id: string;
  updatedAt: string;
  name: string;
  description: string;
  className: string;
}

export default function TaskCard({
  name,
  description,
  className,
  _id,
}: IListItem) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`${Links.task.href}/${_id}`)}
      className={cn(
        "bg-background border py-2 px-3 select-none rounded",
        className
      )}
    >
      <p className="mb-1 text-sm font-medium">{name}</p>
      <p className="text-xs opacity-90">{description}</p>
    </div>
  );
}
