import { cn } from "@/lib/utils";

export interface IListItem {
  _id: string;
  updatedAt: string;
  name: string;
  description: string;
  className: string;
}

export default function TaskCard({ name, description, className }: IListItem) {
  return (
    <div
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
