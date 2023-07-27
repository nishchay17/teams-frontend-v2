"use client";

import { signOut } from "next-auth/react";

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

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const SettingIcon = Icons["setting"];
  return (
    <>
      <div className="border-b-[1px] mb-6">
        <nav className="mx-auto max-w-[1700px] p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <Icons.hero height={24} width={24} />
              <h1 className="font-semibold text-lg">Teams Collab</h1>
            </div>
            <div className="flex gap-4 items-center">
              <p className="border-2 h-fit text-xs font-medium mr-2 px-2 py-0.5 rounded">
                New tasks: 2
              </p>
              <div>
                <p className="text-xs mb-1">
                  <i>Your Status</i>
                </p>
                <div className="flex rounded w-[200px] overflow-hidden">
                  <div title="New" className="bg-red-500 w-[20%] h-2" />
                  <div title="In progress" className="bg-sky-500 w-[50%] h-2" />
                  <div
                    title="Completed"
                    className="bg-emerald-500 w-[30%] h-2"
                  />
                </div>
              </div>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    <SettingIcon />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Toggle Light Mode</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                      onClick={() => signOut({ callbackUrl: "/signin" })}
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
      <div className="px-4 grid gap-12 md:grid-cols-[200px_1px_1fr] mx-auto max-w-[1700px]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={AdminDashboardNav} />
        </aside>
        <div className="w-[1px] bg-border" />
        <main className="flex flex-col">{children}</main>
      </div>
    </>
  );
}
