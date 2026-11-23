interface TraceweaveMarkProps {
  size?: number;
  className?: string;
}

export function TraceweaveMark({
  size = 24,
  className,
}: TraceweaveMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="1.5"
        y="1.5"
        width="25"
        height="25"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.28"
      />
      <path
        d="M6.5 9.5H12.5L15.5 18.5H21.5"
        stroke="var(--accent, #0f6b64)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 18.5H11.2M16.8 9.5H21.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="14" cy="14" r="2.1" fill="var(--accent, #0f6b64)" />
    </svg>
  );
}
