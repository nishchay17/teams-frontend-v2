import Link from "next/link";

import NavbarWrapper from "@/components/nav/nav-wrapper";
import { buttonVariants } from "@/components/ui/button";
import Signin from "@/components/signin";
import { Links } from "@/config/links";

export default function SigninPage() {
  return (
    <section className="flex flex-col min-h-screen">
      <NavbarWrapper>
        <Link
          href={Links.signup.href}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          {Links.signup.title}
        </Link>
      </NavbarWrapper>
      <Signin />
    </section>
  );
}
