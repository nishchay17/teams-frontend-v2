"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Links } from "@/config/links";
import { Button } from "../ui/button";
import { Icons } from "../icons";

export default function LandingNav() {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const router = useRouter();
  const userData = useSession();

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const isAuth = userData.status === "authenticated";

  return (
    <nav
      className={`w-full px-12 flex items-center shadow-sm justify-between bg-background h-14 fixed top-0 transition-all delay-150 duration-500 ease-in-out z-10 ${
        visible ? "translate-y-0" : "-translate-y-14"
      }`}
    >
      <div className="flex items-center">
        <Icons.hero height={16} width={16} />
        <h2 className="text-sm ml-2">Team Collob</h2>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          router.push(isAuth ? Links.task.href : Links.signin.href)
        }
      >
        {isAuth ? "Dashboard" : "Login"}
      </Button>
    </nav>
  );
}
