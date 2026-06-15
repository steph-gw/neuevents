"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Perks", href: "/perks" },
  { label: "Ideas", href: "/ideas" },
] as const;

function preventNav(e: React.MouseEvent) {
  e.preventDefault();
}

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navClass = ["scrolled", menuOpen ? "nav--open" : ""]
    .filter(Boolean)
    .join(" ");

  const closeMenu = () => setMenuOpen(false);

  const navAnchor = (label: string, href?: string) => {
    if (isHome) {
      return (
        <a href="#" onClick={preventNav}>
          {label}
        </a>
      );
    }

    if (href) {
      const onClick = label === "Home" ? goHome : closeMenu;
      return (
        <Link href={href} onClick={onClick}>
          {label}
        </Link>
      );
    }

    return (
      <a href="#" onClick={preventNav}>
        {label}
      </a>
    );
  };

  const logo = isHome ? (
    <a
      href="#"
      className="nav-logo"
      aria-label="neu events home"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <Image
        src="/images/logo.png"
        alt="neu events — naturally elegant & unforgettable"
        width={508}
        height={107}
        priority
        sizes="(max-width: 768px) 160px, 200px"
      />
    </a>
  ) : (
    <Link href="/" className="nav-logo" aria-label="neu events home">
      <Image
        src="/images/logo.png"
        alt="neu events — naturally elegant & unforgettable"
        width={508}
        height={107}
        priority
        sizes="(max-width: 768px) 160px, 200px"
      />
    </Link>
  );

  return (
    <nav id="nav" className={navClass}>
      {logo}

      <div className="nav-end">
        <ul className="nav-links nav-links--left">
          {NAV_LINKS.slice(0, 3).map((link) => (
            <li key={link.label}>
              {navAnchor(link.label, "href" in link ? link.href : undefined)}
            </li>
          ))}
        </ul>

        <ul className="nav-links nav-links--right">
          {NAV_LINKS.slice(3).map((link) => (
            <li key={link.label}>
              {navAnchor(link.label, "href" in link ? link.href : undefined)}
            </li>
          ))}
          <li>
            {isHome ? (
              <a href="#" className="nav-cta" onClick={preventNav}>
                Inquire
              </a>
            ) : (
              <Link href="/contact" className="nav-cta" onClick={closeMenu}>
                Inquire
              </Link>
            )}
          </li>
        </ul>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mounted &&
        createPortal(
          <div
            className={`nav-mobile${menuOpen ? " nav-mobile--open" : ""}`}
            aria-hidden={!menuOpen}
          >
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {navAnchor(link.label, "href" in link ? link.href : undefined)}
                </li>
              ))}
              <li>
                {isHome ? (
                  <a
                    href="#"
                    className="nav-cta nav-cta--mobile"
                    onClick={preventNav}
                  >
                    Inquire
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="nav-cta nav-cta--mobile"
                    onClick={closeMenu}
                  >
                    Inquire
                  </Link>
                )}
              </li>
            </ul>
          </div>,
          document.body,
        )}
    </nav>
  );
}
