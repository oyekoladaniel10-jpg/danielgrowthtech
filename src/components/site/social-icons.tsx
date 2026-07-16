// Simple brand-mark SVGs for platforms lucide-react does not ship.
type IconProps = { className?: string };

export function FiverrIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M23 15.6h-1.7v-6h-6.1v6H13V9.6h-2.6a1.4 1.4 0 0 1 1.5-1.5H13V6h-1.2c-2.2 0-3.8 1.6-3.8 3.7v.2H6.3v1.9H8v3.8H6.3v1.9H13v-1.9h-1.6v-3.8h4.9v5.7H23zM16.2 8a1.4 1.4 0 1 0 0-2.9 1.4 1.4 0 0 0 0 2.9z" />
    </svg>
  );
}

export function UpworkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.6 8.8a4.4 4.4 0 0 0-4.3 3.6c-.8-1.2-1.4-2.7-1.7-4h-3v4.9c0 1.3-1 2.3-2.3 2.3S5 14.6 5 13.3V8.4H3v4.9a4.3 4.3 0 0 0 8.4 1.4c.7 1.4 1.7 2.7 3.1 3.6L14 20h2l.5-2.6a4.4 4.4 0 1 0 2.1-8.6zm0 6.7a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z" />
    </svg>
  );
}
