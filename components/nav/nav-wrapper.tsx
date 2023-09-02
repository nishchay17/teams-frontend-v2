import Link from "next/link";
import { Icons } from "../icons";

import { buttonVariants } from "../ui/button";

export default function NavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <nav className="flex justify-between items-center pt-3 pb-2 sm:fixed sm:container">
      <div className="flex items-center">
        <Icons.hero height={16} width={16} />
        <Link href="/">
          <h2 className="text-sm ml-2">Team Collab</h2>
        </Link>
      </div>
      <div className="flex gap-2">{children}</div>
    </nav>
  );
}
