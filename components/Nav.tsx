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
  { label: "Perks", href: "/perks-and-benefits" },
  { label: "Ideas", href: "/tips-ideas" },
] as const;

function preventNav(e: React.MouseEvent) {
  e.preventDefault();
}

function LegacyNav() {
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
            <Link href="/contact" className="nav-cta" onClick={closeMenu}>
              Contact us
            </Link>
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
                <Link
                  href="/contact"
                  className="nav-cta nav-cta--mobile"
                  onClick={closeMenu}
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>,
          document.body,
        )}
    </nav>
  );
}

function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hasCreamHeader = pathname === "/contact";
  const hasDarkHeader = pathname === "/tips-ideas";
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  const closeMenu = () => setMenuOpen(false);

  const logo = isHome ? (
    <a
      href="#"
      className="site-logo"
      aria-label="neu events home"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      neu<span className="site-logo-mark">events</span>
    </a>
  ) : (
    <Link href="/" className="site-logo" aria-label="neu events home">
      neu<span className="site-logo-mark">events</span>
    </Link>
  );

  return (
    <header
      className={`site-header${scrolled ? " site-header--scrolled" : ""}${hasCreamHeader ? " site-header--cream" : ""}${hasDarkHeader ? " site-header--dark" : ""}`}
    >
      <nav
        className={`site-nav${menuOpen ? " site-nav--open" : ""}`}
        aria-label="Main"
      >
        {logo}

        <div className="site-nav-end">
          <ul className="site-nav-links site-nav-links--desktop">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.label === "Home" ? (
                  <Link href={link.href} onClick={goHome}>
                    {link.label}
                  </Link>
                ) : (
                  <Link href={link.href}>{link.label}</Link>
                )}
              </li>
            ))}
          </ul>

          <Link href="/contact" className="site-nav-cta" onClick={closeMenu}>
            Contact Us
          </Link>

          <button
            type="button"
            className="site-nav-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {mounted && (
        <div
          className={`site-nav-mobile${menuOpen ? " site-nav-mobile--open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.label === "Home" ? (
                  <Link href={link.href} onClick={goHome}>
                    {link.label}
                  </Link>
                ) : (
                  <Link href={link.href} onClick={closeMenu}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Link href="/contact" className="site-nav-cta" onClick={closeMenu}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const isLegacy = pathname.startsWith("/old_index");

  if (isLegacy) {
    return <LegacyNav />;
  }

  return <SiteNav />;
}
