import Link from "next/link";

import { buttonVariants } from "../ui/button";

export default function NavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <nav className="flex justify-between items-center pt-3 pb-2 sm:fixed sm:container">
      <Link href="/" className={buttonVariants({ variant: "link" })}>
        <h2 className="font-medium">Teams</h2>
      </Link>
      <div className="flex gap-2">{children}</div>
    </nav>
  );
}
