"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useInquiryModal } from "@/components/InquiryModal";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services & Portfolio", href: "/services" },
  { label: "Travel", href: "/travel" },
  { label: "Contact", href: "/contact" },
] as const;

function preventNav(e: React.MouseEvent) {
  e.preventDefault();
}

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { openInquiry } = useInquiryModal();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openInquiryFromNav = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    openInquiry();
  };

  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
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

  const showScrolled = !isHome || (mounted && scrolled);
  const navClass = [showScrolled ? "scrolled" : "", menuOpen ? "nav--open" : ""]
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

  return (
    <nav id="nav" className={navClass}>
      <Link href="/" className="nav-logo">
        neu<span> events</span>
      </Link>

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
            <a href="#" className="nav-cta" onClick={openInquiryFromNav}>
              Inquire
            </a>
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
                <a
                  href="#"
                  className="nav-cta nav-cta--mobile"
                  onClick={openInquiryFromNav}
                >
                  Inquire
                </a>
              </li>
            </ul>
          </div>,
          document.body,
        )}
    </nav>
  );
}
