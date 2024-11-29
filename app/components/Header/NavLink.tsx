"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className = "" }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        ${className}
        ${isActive ? "text-primary font-medium" : "text-muted-foreground"}
        hover:text-primary transition-colors
        px-4 py-2 rounded-md
      `}
    >
      {children}
    </Link>
  );
};

export default NavLink; 