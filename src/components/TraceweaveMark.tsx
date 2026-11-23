interface TraceweaveMarkProps {
  size?: number;
  className?: string;
}

export function TraceweaveMark({
  size = 26,
  className,
}: TraceweaveMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Four archival registration corner brackets */}
      <path
        d="M2 2H8V4H4V8H2V2ZM24 2H30V8H28V4H24V2ZM2 24H4V28H8V30H2V24ZM28 24H30V30H24V28H28V24Z"
        fill="currentColor"
      />
      {/* Inner 2x2 verification hash grid */}
      <rect x="8" y="8" width="6" height="6" fill="currentColor" />
      <rect x="18" y="18" width="6" height="6" fill="currentColor" />
      <path
        fillRule="evenodd"
        d="M8 18H14V24H8V18ZM10 20V22H12V20H10Z"
        fill="currentColor"
      />
      {/* Verified correspondence bar + signal cell */}
      <rect x="14" y="10" width="4" height="2" fill="var(--tw-accent, #096B56)" />
      <rect x="18" y="8" width="6" height="6" fill="var(--tw-accent, #096B56)" />
    </svg>
  );
}
