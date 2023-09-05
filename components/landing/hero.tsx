import Link from "next/link";

import { Button } from "@/components/ui/button";
import { githubLink, Links } from "@/config/links";
import { Icons } from "../icons";

export default function Hero() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div>
        <h1 className="text-4xl sm:text-5xl px-4 md:text-7xl font-semibold text-secondary-foreground text-center">
          Reimagine how <br /> your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 dark:from-yellow-300 to-orange-500 dark:to-orange-400">
            team colabs.
          </span>
        </h1>
        <p className="text-center text-lg opacity-75 leading-6 mt-10 px-4">
          Teams Collab gets your team in-sync <br />
          with asingle platform for all your tasks.
        </p>
        <div className="flex justify-center mt-12">
          <Link href={Links.signup.href}>
            <Button size="sm" variant="outline" className="mr-3 shadow">
              Registration
            </Button>
          </Link>
          <Link href={Links.signin.href}>
            <Button size="sm" variant="ghost">
              Have a joining key?
            </Button>
          </Link>
        </div>
        <div className="mt-6 text-center">
          <Link href={githubLink} target="_blank" rel="noopener">
            <Button size="sm" variant={"ghost"}>
              <Icons.github size="1.25rem" className="mr-2" /> Visit us at
              Github
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
