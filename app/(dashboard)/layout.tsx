"use client";

import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

import { Icons } from "@/components/icons";
import { DashboardNav } from "@/components/nav/dashboard-nav";
import { AdminDashboardNav } from "@/config/dashboard-nav";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Links } from "@/config/links";
import TaskStats from "@/components/taskStats";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { setTheme, theme } = useTheme();
  const SettingIcon = Icons["setting"];
  return (
    <>
      <div className="border-b-[1px] mb-6">
        <nav className="mx-auto max-w-[1700px] p-4">
          <div className="flex justify-between items-center gap-3">
            <div className="flex gap-3 items-center">
              <Icons.hero height={24} width={24} />
              <h1 className="font-semibold text-sm sm:text-base lg:text-lg leading-tight">
                Teams <br className="sm:hidden" /> Collab
              </h1>
            </div>
            <div className="flex gap-4 items-center">
              <TaskStats />
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger aria-label="setting">
                    <SettingIcon />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem
                      onClick={() =>
                        theme == "dark" ? setTheme("light") : setTheme("dark")
                      }
                    >
                      Toggle Light Mode
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                      onClick={() =>
                        signOut({ callbackUrl: Links.signin.href })
                      }
                    >
                      Logout
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </nav>
      </div>
      <div className="px-4 grid gap-3 md:gap-6 lg:gap-12 grid-cols-[auto_1px_1fr] lg:grid-cols-[200px_1px_1fr] mx-auto max-w-[1700px]">
        <aside className="flex-col flex">
          <DashboardNav items={AdminDashboardNav} />
        </aside>
        <div className="w-[1px] bg-border" />
        <main className="flex flex-col">{children}</main>
      </div>
    </>
  );
}
