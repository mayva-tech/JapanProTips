/** AoM-style nav chevron: points down by default, up when `open`. */
export function NavChevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 12 8"
      width={10}
      height={7}
      aria-hidden
      className={`ml-1.5 inline-block shrink-0 transition-transform duration-150 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
