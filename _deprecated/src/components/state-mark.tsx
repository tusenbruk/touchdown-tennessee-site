import { cn } from "@/lib/cn";

/** Geographic outline of Tennessee — not a university mark. */
export function StateMark({ className }: { className?: string }) {
  return (
    <svg viewBox="8 28 84 44" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M29.96 32.7 L29.8 28.0 L31.93 29.14 L44.19 28.57 L54.96 29.57 L56.88 29.28 L64.12 30.14 L72.44 30.42 L72.6 29.99 L92.0 30.28 L91.57 36.4 L89.76 37.68 L88.54 42.52 L86.78 41.53 L82.94 46.51 L82.67 43.95 L81.34 45.66 L79.21 51.5 L76.7 52.92 L74.3 56.91 L71.64 57.05 L69.24 60.89 L68.49 65.17 L66.58 65.73 L66.31 71.86 L53.78 72.0 L36.73 71.57 L28.52 71.72 L25.91 71.72 L8.0 71.72 L8.96 71.0 L9.92 66.45 L9.76 60.18 L11.57 55.91 L11.89 51.92 L13.33 50.5 L13.65 45.66 L15.57 39.11 L15.52 32.7 L16.05 32.7 L16.69 32.7 L17.86 32.41 L29.96 32.7 Z" />
    </svg>
  );
}
