import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "link";
export type ButtonSize = "default" | "compact";

export function ExternalArrowIcon({
  size = 15,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M4.5 11.5L11.5 4.5M6.5 4.5H11.5V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
  external,
  className,
  children,
  ...rest
}: ButtonProps) {
  const isExt = isAnchor(rest) ? (external ?? isExternalHref(rest.href)) : Boolean(external);

  const classes = [
    "btn",
    `btn-${variant}`,
    size === "compact" ? "btn-compact" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const iconSize = size === "compact" ? 14 : 15;

  const content = (
    <>
      <span className="btn-label">{children}</span>
      {isExt ? <ExternalArrowIcon size={iconSize} className="btn-external-icon" /> : null}
    </>
  );

  if (isAnchor(rest)) {
    const { href, ...anchorRest } = rest;

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
