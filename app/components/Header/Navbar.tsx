"use client";

import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import Image from "next/image";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className = "" }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  if (!isMounted) {
    return (
      <nav className={`${className} relative`}>
        <div className="hidden md:flex items-center gap-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`${className} relative`}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/services">Services</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="p-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <Image 
              src="/window.svg"
              alt="Close menu"
              width={24}
              height={24}
              className="text-current"
            />
          ) : (
            <Image 
              src="/globe.svg"
              alt="Open menu"
              width={24}
              height={24}
              className="text-current"
            />
          )}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-lg p-4 mt-2">
            <div className="flex flex-col gap-2">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/services">Services</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 