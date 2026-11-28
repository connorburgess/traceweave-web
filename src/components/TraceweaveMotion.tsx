"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface SplitHeadingRecord {
  el: HTMLElement;
  original: string;
}

export function TraceweaveMotion() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const bar = barRef.current;
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Always enhance <pre> blocks with accessible Copy buttons, even under reduced motion.
    const addedCopyWraps: Array<{ wrap: HTMLElement; pre: HTMLPreElement }> = [];
    document.querySelectorAll<HTMLPreElement>("main pre").forEach((pre) => {
      if (pre.parentElement?.classList.contains("code-block-wrap")) return;
      const code = pre.querySelector("code");
      if (!code) return;

      const wrap = document.createElement("div");
      wrap.className = "code-block-wrap";
      pre.parentNode?.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy";
      btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy code block to clipboard");

      const live = document.createElement("span");
      live.className = "sr-only";
      live.setAttribute("role", "status");
      live.setAttribute("aria-live", "polite");

      let timer: ReturnType<typeof setTimeout> | null = null;
      btn.addEventListener("click", async () => {
        const text = code.textContent?.trim() ?? "";
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = "Copied";
          btn.dataset.copied = "true";
          wrap.dataset.copied = "true";
          live.textContent = "Code copied to clipboard.";
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            btn.textContent = "Copy";
            delete btn.dataset.copied;
            delete wrap.dataset.copied;
          }, 2200);
        } catch {
          live.textContent = "Select and copy the code block above.";
        }
      });

      wrap.append(btn, live);
      addedCopyWraps.push({ wrap, pre });
    });

    // Reset scroll position to top on route navigation unless a hash target is present.
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    if (reducedQuery.matches) {
      return () => {
        addedCopyWraps.forEach(({ wrap, pre }) => {
          if (wrap.isConnected) {
            wrap.parentNode?.insertBefore(pre, wrap);
            wrap.remove();
          }
        });
      };
    }

    root.classList.add("has-motion");
    root.classList.remove("hero-entered");

    let cancelled = false;
    const splitHeadings: SplitHeadingRecord[] = [];
    const createdRules: HTMLElement[] = [];
    const highlightedParagraphs: Array<{ el: HTMLElement; original: string }> = [];
    let railEl: HTMLElement | null = null;
    let lenis: Lenis | null = null;

    const updateProgress = (progress: number) => {
      if (!bar) return;
      const clamped = Math.max(0, Math.min(1, progress));
      bar.style.transform = `scaleX(${clamped})`;
      bar.style.opacity = clamped > 0.004 ? "1" : "0";
    };

    // Parallax targets (optical-bench imagery)
    const parallaxItems: Array<{ frame: HTMLElement; inners: HTMLElement[]; range: number }> = [];
    document
      .querySelectorAll<HTMLElement>(".hero-media, .provenance-media, .medium-plate")
      .forEach((frame) => {
        const inners = Array.from(frame.querySelectorAll<HTMLElement>("picture"));
        if (!inners.length) return;
        inners.forEach((pic) => pic.classList.add("tw-parallax-inner"));
        const range = frame.classList.contains("hero-media")
          ? 20
          : frame.classList.contains("provenance-media")
            ? 14
            : 10;
        parallaxItems.push({ frame, inners, range });
      });

    const updateParallax = () => {
      const vh = window.innerHeight || 900;
      for (const item of parallaxItems) {
        const rect = item.frame.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > vh + 120) continue;
        const ratio =
          (rect.top + rect.height * 0.5 - vh * 0.5) /
          (vh * 0.5 + rect.height * 0.5);
        const clamped = Math.max(-1, Math.min(1, ratio));
        const y = (-clamped * item.range).toFixed(2);
        for (const pic of item.inners) {
          pic.style.transform = `translate3d(0, ${y}px, 0) scale(1.07)`;
        }
      }
    };

    // Adaptive right-edge section tick rail for pages with 3+ labelled sections
    const sectionEntries: Array<{ id: string; label: string; section: HTMLElement }> = [];
    const heroEl = document.querySelector<HTMLElement>("main .hero, main .page-header");
    if (heroEl) {
      if (!heroEl.id) heroEl.id = "page-top";
      sectionEntries.push({ id: heroEl.id, label: "Overview", section: heroEl });
    }
    document
      .querySelectorAll<HTMLElement>("main section[aria-labelledby]")
      .forEach((section) => {
        const headingId = section.getAttribute("aria-labelledby");
        if (!headingId) return;
        const heading = document.getElementById(headingId);
        const eyebrow = section.querySelector<HTMLElement>(".eyebrow");
        const rawLabel = (eyebrow?.textContent || heading?.textContent || "").trim();
        if (!rawLabel) return;
        const compactLabel = rawLabel.length > 22 ? `${rawLabel.slice(0, 20).trim()}…` : rawLabel;
        sectionEntries.push({ id: headingId, label: compactLabel, section });
      });

    const railLinks = new Map<string, HTMLAnchorElement>();
    if (sectionEntries.length >= 3) {
      railEl = document.createElement("nav");
      railEl.className = "section-rail";
      railEl.setAttribute("aria-label", "Page sections");

      sectionEntries.forEach((entry) => {
        const link = document.createElement("a");
        link.href = `#${entry.id}`;
        link.className = "section-rail-item";

        const label = document.createElement("span");
        label.className = "section-rail-label";
        label.textContent = entry.label;

        const tick = document.createElement("span");
        tick.className = "section-rail-tick";
        tick.setAttribute("aria-hidden", "true");

        link.append(label, tick);
        railEl!.appendChild(link);
        railLinks.set(entry.id, link);
      });

      document.body.appendChild(railEl);
    }

    const updateRail = () => {
      if (!railEl) return;
      const scrollY = window.scrollY;
      if (scrollY > 140) {
        railEl.setAttribute("data-visible", "true");
      } else {
        railEl.removeAttribute("data-visible");
      }

      const atBottom =
        scrollY + window.innerHeight >= document.documentElement.scrollHeight - 24;
      let activeId = atBottom
        ? sectionEntries[sectionEntries.length - 1].id
        : sectionEntries[0].id;
      if (!atBottom) {
        const probe = scrollY + window.innerHeight * 0.42;
        for (const entry of sectionEntries) {
          const top = entry.section.getBoundingClientRect().top + scrollY;
          if (probe >= top) activeId = entry.id;
        }
      }

      railLinks.forEach((link, id) => {
        if (id === activeId) {
          link.setAttribute("data-active", "true");
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("data-active");
          link.removeAttribute("aria-current");
        }
      });
    };

    // Lenis smooth scroll
    lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      syncTouch: false,
      prevent: (node) => Boolean(node.closest("pre, .table-wrap")),
    });
    if (!window.location.hash) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
    root.classList.add("lenis", "lenis-smooth");
    lenis.on("scroll", ({ progress }) => {
      updateProgress(progress);
      updateParallax();
      updateRail();
    });

    const handleAnchorClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented) return;
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link =
        event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const samePath =
        url.pathname.replace(/\/$/, "") ===
        window.location.pathname.replace(/\/$/, "");
      if (!samePath || !url.hash) return;
      const dest = document.querySelector<HTMLElement>(url.hash);
      if (!dest) return;
      event.preventDefault();
      lenis.scrollTo(dest, {
        offset: -84,
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      window.history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", handleAnchorClick);

    // Line-by-line visual headline splitter
    const splitIntoVisualLines = (
      el: HTMLElement,
      baseDelayMs: number,
      stepMs: number,
    ) => {
      if (el.children.length > 0) return;
      const original = (el.textContent || "").trim();
      if (!original) return;
      const words = original.split(/\s+/);
      if (words.length <= 1) {
        el.textContent = "";
        const mask = document.createElement("span");
        mask.className = "reveal-line-mask";
        const inner = document.createElement("span");
        inner.className = "reveal-line";
        inner.style.setProperty("--line-delay", `${baseDelayMs}ms`);
        inner.textContent = original;
        mask.appendChild(inner);
        el.appendChild(mask);
        el.setAttribute("data-line-split", "true");
        splitHeadings.push({ el, original });
        return;
      }

      el.textContent = "";
      const probes = words.map((word, idx) => {
        const span = document.createElement("span");
        span.style.display = "inline";
        span.textContent = word;
        el.appendChild(span);
        if (idx < words.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
        return span;
      });

      const lines: string[][] = [];
      let currentLine: string[] = [];
      let lastTop: number | null = null;

      probes.forEach((span, idx) => {
        const top = Math.round(span.getBoundingClientRect().top / 4);
        if (lastTop !== null && top !== lastTop && currentLine.length > 0) {
          lines.push(currentLine);
          currentLine = [];
        }
        currentLine.push(words[idx]);
        lastTop = top;
      });
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }

      el.textContent = "";
      lines.forEach((lineWords, lineIdx) => {
        const mask = document.createElement("span");
        mask.className = "reveal-line-mask";
        const inner = document.createElement("span");
        inner.className = "reveal-line";
        inner.style.setProperty(
          "--line-delay",
          `${baseDelayMs + lineIdx * stepMs}ms`,
        );
        inner.textContent =
          lineWords.join(" ") + (lineIdx < lines.length - 1 ? " " : "");
        mask.appendChild(inner);
        el.appendChild(mask);
      });

      el.setAttribute("data-line-split", "true");
      splitHeadings.push({ el, original });
    };

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (Math.abs(window.innerWidth - lastWidth) < 24) return;
      lastWidth = window.innerWidth;
      splitHeadings.forEach((item) => {
        item.el.textContent = item.original;
        item.el.removeAttribute("data-line-split");
      });
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Tag hero elements
    const heroCopy = document.querySelector<HTMLElement>("main .hero-copy");
    const heroH1 =
      heroCopy?.querySelector<HTMLElement>("h1") ??
      document.querySelector<HTMLElement>("main h1");
    if (heroCopy) {
      const heroEyebrow = heroCopy.querySelector<HTMLElement>(":scope > .eyebrow");
      if (heroEyebrow) heroEyebrow.setAttribute("data-hero-reveal", "1");
      let stepIdx = 2;
      heroCopy
        .querySelectorAll<HTMLElement>(":scope > p, :scope > .actions")
        .forEach((el) => {
          el.setAttribute("data-hero-reveal", String(Math.min(stepIdx, 5)));
          stepIdx++;
        });
    }
    const heroMedia = document.querySelector<HTMLElement>("main .hero-media");
    if (heroMedia) heroMedia.setAttribute("data-hero-media", "true");
    const heroStatus = document.querySelector<HTMLElement>("main .hero .card-muted");
    if (heroStatus) heroStatus.setAttribute("data-hero-reveal", "5");

    // Prepare below-the-fold sections
    document
      .querySelectorAll<HTMLElement>("main .section, main .section-tight")
      .forEach((section) => {
        const rule = document.createElement("span");
        rule.className = "section-rule";
        rule.setAttribute("aria-hidden", "true");
        section.prepend(rule);
        createdRules.push(rule);
        section.setAttribute("data-reveal-section", "true");

        const introP = section.querySelector<HTMLElement>(":scope > .container > p.prose");
        if (introP && introP.children.length === 0) {
          const text = (introP.textContent || "").trim();
          if (text) {
            const words = text.split(/\s+/);
            const step = Math.min(44, Math.round(1150 / Math.max(1, words.length)));
            introP.textContent = "";
            words.forEach((word, index) => {
              const span = document.createElement("span");
              span.className = "hl-word";
              span.style.transitionDelay = `${index * step}ms`;
              span.textContent = index < words.length - 1 ? `${word} ` : word;
              introP.appendChild(span);
            });
            introP.setAttribute("data-reveal", "highlight");
            highlightedParagraphs.push({ el: introP, original: text });
          }
        }

        section.querySelectorAll<HTMLElement>(".diagram-frame").forEach((el) => {
          el.setAttribute("data-reveal", "diagram");
        });

        section
          .querySelectorAll<HTMLElement>(
            ".grid-2 > .card, .grid-3 > .card, .grid-5 > .card, .stat-card, .medium-plate",
          )
          .forEach((el, idx) => {
            el.setAttribute("data-reveal", "card");
            el.style.setProperty("--stagger", `${idx * 130}ms`);
          });

        section
          .querySelectorAll<HTMLElement>(":scope > .container > .card, :scope > .container > .card-muted, .table-wrap")
          .forEach((el) => {
            el.setAttribute("data-reveal", "block");
          });
      });

    let sectionObserver: IntersectionObserver | null = null;
    let itemObserver: IntersectionObserver | null = null;

    const fontsReady =
      document.fonts && document.fonts.ready
        ? Promise.race([
            document.fonts.ready,
            new Promise<void>((resolve) => setTimeout(resolve, 250)),
          ])
        : Promise.resolve();

    void fontsReady.then(() => {
      if (cancelled) return;
      if (!window.location.hash) {
        window.scrollTo(0, 0);
        lenis?.scrollTo(0, { immediate: true, force: true });
      }
      if (heroH1) {
        splitIntoVisualLines(heroH1, 20, 75);
      }
      document
        .querySelectorAll<HTMLElement>(
          "main .section h2, main .section-tight h2",
        )
        .forEach((h2) => {
          splitIntoVisualLines(h2, 20, 75);
        });

      const targets = document.querySelectorAll<HTMLElement>(
        "[data-reveal], [data-reveal-section]",
      );
      const vhInit = window.innerHeight || 900;

      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vhInit * 0.92) {
          el.classList.add("is-visible");
        }
      });

      sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            sectionObserver?.unobserve(entry.target);
          });
        },
        { threshold: 0.01, rootMargin: "0px 0px -6% 0px" },
      );

      itemObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            itemObserver?.unobserve(entry.target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
      );

      targets.forEach((el) => {
        if (el.classList.contains("is-visible")) return;
        if (el.hasAttribute("data-reveal-section")) {
          sectionObserver?.observe(el);
        } else {
          itemObserver?.observe(el);
        }
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) {
            root.classList.add("hero-entered");
          }
        });
      });
    });

    updateProgress(0);
    updateParallax();
    updateRail();

    const onReducedChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        lenis?.destroy();
        lenis = null;
        root.classList.remove("has-motion", "hero-entered", "lenis", "lenis-smooth");
        splitHeadings.forEach((item) => {
          item.el.textContent = item.original;
          item.el.removeAttribute("data-line-split");
        });
        parallaxItems.forEach((item) => {
          item.inners.forEach((pic) => {
            pic.style.transform = "";
          });
        });
        railEl?.remove();
        railEl = null;
      }
    };
    reducedQuery.addEventListener("change", onReducedChange);

    return () => {
      cancelled = true;
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("resize", handleResize);
      reducedQuery.removeEventListener("change", onReducedChange);
      sectionObserver?.disconnect();
      itemObserver?.disconnect();
      lenis?.destroy();
      lenis = null;
      root.classList.remove("lenis", "lenis-smooth");
      railEl?.remove();
      createdRules.forEach((r) => r.remove());
      splitHeadings.forEach((item) => {
        if (item.el.isConnected) {
          item.el.textContent = item.original;
          item.el.removeAttribute("data-line-split");
        }
      });
      highlightedParagraphs.forEach((item) => {
        if (item.el.isConnected) {
          item.el.textContent = item.original;
          item.el.removeAttribute("data-reveal");
        }
      });
      addedCopyWraps.forEach(({ wrap, pre }) => {
        if (wrap.isConnected) {
          wrap.parentNode?.insertBefore(pre, wrap);
          wrap.remove();
        }
      });
    };
  }, [pathname]);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
