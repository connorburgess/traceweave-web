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

type ThemeMode = "system" | "light" | "dark";

const THEME_STORAGE_KEY = "traceweave-theme";
const THEME_EVENT = "traceweave-theme-change";

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
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Storage unavailable; fall back to system.
  }
  return "system";
}

function getServerThemeSnapshot(): ThemeMode {
  return "system";
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
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
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

  function cycleTheme() {
    const next: ThemeMode =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    try {
      if (next === "system") {
        window.localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      }
    } catch {
      // Ignore storage errors.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  const themeLabel =
    theme === "system" ? "Theme: Auto" : theme === "light" ? "Theme: Light" : "Theme: Dark";

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setMenuOpen(false)}>
          <TraceweaveMark size={26} />
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
            onClick={cycleTheme}
            aria-label={`Switch colour theme (currently ${theme})`}
          >
            <span aria-hidden="true">
              {theme === "dark" ? "◐" : theme === "light" ? "☀" : "◑"}
            </span>
            <span>{themeLabel}</span>
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
