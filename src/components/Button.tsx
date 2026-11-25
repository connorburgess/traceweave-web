import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "link";
export type ButtonSize = "default" | "compact";
export type ButtonIcon = "arrow" | "none";

export function ArrowUpRightIcon({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M9.05025 19.4497L18.9497 9.55025M10.8377 8.86279L18.9497 9.55025L19.6372 17.6623"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ButtonIcon;
  external?: boolean;
  className?: string;
  children: ReactNode;
}

type AnchorRest = { href: string } & Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "className" | "children"
>;

type NativeRest = { href?: undefined } & Omit<
  ComponentPropsWithoutRef<"button">,
  "className" | "children"
>;

export type ButtonProps = ButtonOwnProps & (AnchorRest | NativeRest);

const isAnchor = (rest: AnchorRest | NativeRest): rest is AnchorRest =>
  typeof rest.href === "string";

const isExternalHref = (href: string) =>
  /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");

export function Button({
  variant = "primary",
  size = "default",
  icon = "arrow",
  external,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    size === "compact" ? "btn-compact" : "",
    icon === "none" ? "btn-no-icon" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const arrowSize = size === "compact" ? 22 : 24;

  const content = (
    <>
      <span className="btn-label">{children}</span>
      {icon === "arrow" ? (
        <span className="btn-arrow" aria-hidden="true">
          <ArrowUpRightIcon size={arrowSize} />
        </span>
      ) : null}
    </>
  );

  if (isAnchor(rest)) {
    const { href, ...anchorRest } = rest;
    const isExt = external ?? isExternalHref(href);

    if (isExt) {
      return (
        <a
          href={href}
          className={classes}
          rel={anchorRest.rel ?? "noopener noreferrer"}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest;

  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
