import { Link } from "@tanstack/react-router";
import { PrimaryMark } from "@/components/brand-mark";

/** One page, so the header is the mark and nothing else. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:h-[4.25rem] sm:px-6">
        <Link to="/" className="flex items-center text-ink" aria-label="Touchdown Tennessee home">
          <PrimaryMark />
        </Link>
      </div>
    </header>
  );
}
