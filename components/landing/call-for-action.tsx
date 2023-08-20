import Link from "next/link";

import { Links } from "@/config/links";
import { Button } from "@/components/ui/button";

export default function CallForAction() {
  return (
    <div className="bg-secondary/60 py-20 text-center">
      <p className="text-2xl md:text-3xl lg:text-4xl px-4 font-semibold text-center mb-5">
        Ready to get started? <br />
        with{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 dark:from-yellow-300 to-orange-500 dark:to-orange-400">
          Team Collab
        </span>
      </p>
      <div className="flex justify-center mt-7">
        <Link href={Links.signup.href}>
          <Button variant="outline" className="mr-3 shadow">
            Registration
          </Button>
        </Link>
        <Link href={Links.signin.href}>
          <Button variant="ghost">Have a joining key?</Button>
        </Link>
      </div>
    </div>
  );
}
