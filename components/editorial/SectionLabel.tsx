type SectionLabelProps = {
  children: string;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p className={`editorial-kicker mb-3 ${className}`.trim()}>{children}</p>
  );
}
