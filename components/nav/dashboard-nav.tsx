"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface DashboardNavProps {
  items: { href: string; title: string; icon?: string }[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon ?? "arrowRight"];
        return (
          item.href && (
            <Link key={index} href={item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground w-fit",
                  path === item.href ? "bg-accent" : "transparent"
                )}
              >
                <Icon className="md:mr-2 h-4 w-4" />
                <span className="hidden md:block">{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
