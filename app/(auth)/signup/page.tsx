import Link from "next/link";

import NavbarWrapper from "@/components/nav/nav-wrapper";
import { buttonVariants } from "@/components/ui/button";
import Signup from "@/components/signup";

export default function SignupPage() {
  return (
    <section className="flex flex-col min-h-screen">
      <NavbarWrapper>
        <Link
          href="signin"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Sign in
        </Link>
      </NavbarWrapper>
      <Signup />
    </section>
  );
}
