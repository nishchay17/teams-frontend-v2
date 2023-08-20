import { cn } from "@/lib/utils";
import { Icons } from "../icons";

export type FeatureType = {
  title: string;
  description: string;
  icon: string;
  className?: string;
};

function FeatureCard({ title, description, icon, className }: FeatureType) {
  const Icon = Icons[icon];
  return (
    <div
      className={cn(
        className,
        "border px-5 py-3 rounded-md cursor-pointer hover:bg-secondary transition-all duration-200"
      )}
    >
      <div className="flex items-center mb-1">
        <Icon size="1.25rem" color="rgb(234 88 12)" />
        <h3 className="font-medium text-lg ml-2">{title}</h3>
      </div>
      <p className="opacity-80">{description}</p>
    </div>
  );
}

export default FeatureCard;
