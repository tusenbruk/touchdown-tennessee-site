import { Link } from "@tanstack/react-router";
import { Newsletter } from "@/components/newsletter";
import { BrandStamp } from "@/components/brand-mark";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div>
          <BrandStamp
            src="/brand/primary-cream.png"
            alt="Touchdown Tennessee"
            className="h-16 sm:h-20"
          />
          <p className="mt-4 font-display text-3xl uppercase tracking-[0.08em]">Knoxville</p>
          <p className="mt-3 max-w-sm text-sm text-cream/65">
            Original mark. No licensed logos, no bookstore markup. The shop is merch. Saturday is why you stay.
          </p>
        </div>
        <Newsletter dark />
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap gap-4">
            <Link to="/shop" className="hover:text-cream">
              Shop
            </Link>
            <Link to="/saturday" className="hover:text-cream">
              Saturday
            </Link>
            <Link to="/saturday/wire" className="hover:text-cream">
              The Wire
            </Link>
            <Link to="/saturday/six" className="hover:text-cream">
              Give Him 6
            </Link>
            <Link to="/independent" className="hover:text-cream">
              Independent
            </Link>
            <a href="mailto:touchdowntennessee@gmail.com" className="hover:text-cream">
              touchdowntennessee@gmail.com
            </a>
          </div>
          <p className="max-w-xl">
            All designs are original and do not incorporate any officially licensed University of
            Tennessee, NFL, or Tennessee Titans marks. Not affiliated with, endorsed by, or connected
            to those institutions. The Wire is satire, not reporting.
          </p>
        </div>
      </div>
    </footer>
  );
}
