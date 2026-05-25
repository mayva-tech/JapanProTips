import Image from "next/image";

type NavSearchIconProps = {
  className?: string;
  size?: number;
};

/**
 * Magnifying glass beside SEARCH (AoM-style).
 * Uses brand search asset with SVG fallback.
 */
export function NavSearchIcon({ className = "", size = 18 }: NavSearchIconProps) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Image
        src="/images/ui/nav-search-icon.png"
        alt=""
        width={size}
        height={size}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
