"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { TraceweaveMark } from "@/components/TraceweaveMark";
import { DOCS_URL } from "@/lib/sources";

const NAV_ITEMS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/coverage", label: "What it covers" },
  { href: "/evidence", label: "Evidence & limits" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/about", label: "About" },
] as const;

type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "traceweave-theme";
const THEME_EVENT = "traceweave-theme-change";
let memoryTheme: ThemeMode | null = null;

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getThemeSnapshot(): ThemeMode {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // Storage unavailable; fall back to in-memory toggle or light default.
  }
  return memoryTheme ?? "light";
}

function getServerThemeSnapshot(): ThemeMode {
  return "light";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function toggleTheme() {
    const next: ThemeMode = theme === "dark" ? "light" : "dark";
    memoryTheme = next;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage errors; memoryTheme keeps the toggle functional.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  const isDark = theme === "dark";

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="Traceweave"
          onClick={() => setMenuOpen(false)}
        >
          <TraceweaveMark size={28} />
          <span>Traceweave</span>
        </Link>

        <nav aria-label="Primary" className="nav-desktop">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname === `${item.href}/`;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <a href={DOCS_URL} className="nav-link" rel="noopener noreferrer">
            Docs ↗
          </a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label="Dark theme"
            aria-pressed={isDark}
          >
            <span aria-hidden="true">{isDark ? "☾" : "☀"}</span>
            <span>{isDark ? "Dark" : "Light"}</span>
          </button>

          <button
            type="button"
            className="icon-button mobile-menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile"
        className="nav-mobile"
        data-open={menuOpen ? "true" : "false"}
      >
        <ul className="nav-mobile-list">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname === `${item.href}/`;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-link"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={DOCS_URL}
              className="nav-link"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Docs ↗
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
