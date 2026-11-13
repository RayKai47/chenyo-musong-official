"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { COMPANY, NAV } from "@/shared/lib/site";

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="nav">
      <Link className="lg" href="/">
        <Logo variant="mark" />
        <span>{COMPANY}</span>
      </Link>
      <ul>
        {NAV.map((n) => (
          <li key={n.href}>
            <Link href={n.href} aria-current={path === n.href ? "page" : undefined}>
              {n.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
