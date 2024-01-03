"use client";

import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLink = ({ children, href }) => {
  const pathname = usePathname();

  const classNameLink = `link ${pathname === href ? "active" : ""}`;
  return (
    <Link className={classNameLink} href={`${href}`}>
      {children}
    </Link>
  );
};

export default function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive-nav");
  };

  return (
    <header>
      <div className="container-nav">
        <div>
          {/* <Link href="/" className="link">
            HOME
          </Link> */}
        </div>
        <nav ref={navRef}>
          <div className="container-links">
            <NavbarLink href="/products">Mis Productos</NavbarLink>
          </div>
          <button className="nav-btn nav-close-btn" aria-label="Close" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
      </div>
      <button className="nav-btn" aria-label="Open" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}
