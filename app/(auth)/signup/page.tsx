import Link from "next/link";

import NavbarWrapper from "@/components/nav/nav-wrapper";
import { buttonVariants } from "@/components/ui/button";
import Signup from "@/components/signup";
import { Links } from "@/config/links";

export default function SignupPage() {
  return (
    <section className="flex flex-col min-h-screen">
      <NavbarWrapper>
        <Link
          href={Links.signin.href}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          {Links.signin.title}
        </Link>
      </NavbarWrapper>
      <Signup />
    </section>
  );
}
