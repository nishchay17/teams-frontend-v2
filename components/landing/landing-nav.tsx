"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function LandingNav() {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

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

  return (
    <nav
      className={`w-full px-12 flex items-center shadow-sm justify-between bg-background h-14 fixed top-0 transition-all delay-150 duration-500 ease-in-out z-10 ${
        visible ? "translate-y-0" : "-translate-y-14"
      }`}
    >
      <h2 className="text-sm">Team Collob</h2>
      <Button size="sm" variant="outline">
        Login
      </Button>
    </nav>
  );
}
