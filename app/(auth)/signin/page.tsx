import Link from "next/link";

import NavbarWrapper from "@/components/nav/nav-wrapper";
import { buttonVariants } from "@/components/ui/button";
import Signin from "@/components/signin";

export default function SigninPage() {
  return (
    <section className="flex flex-col min-h-screen">
      <NavbarWrapper>
        <Link
          href="signup"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Sign up
        </Link>
      </NavbarWrapper>
      <Signin />
    </section>
  );
}
