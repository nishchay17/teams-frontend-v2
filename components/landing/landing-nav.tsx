"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { githubLink, Links } from "@/config/links";
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
      className={` px-4 md:px-12 w-full shadow-sm bg-background fixed top-0 transition-all delay-150 duration-500 ease-in-out z-10 ${
        visible ? "translate-y-0" : "-translate-y-14"
      }`}
    >
      <div className="flex items-center justify-between h-14 w-full 2xl:max-w-[1600px] mx-auto">
        <div className="flex items-center">
          <Icons.hero height={16} width={16} />
          <h2 className="text-sm ml-2">Team Collob</h2>
        </div>
        <div className="flex gap-2">
          <Link href={githubLink} target="_blank" rel="noopener">
            <Button size="sm" variant={"ghost"}>
              <Icons.github size="1.25rem" />
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(isAuth ? Links.task.href : Links.signin.href)
            }
          >
            {isAuth ? "Dashboard" : "Login"}
          </Button>
        </div>
      </div>
    </nav>
  );
}
