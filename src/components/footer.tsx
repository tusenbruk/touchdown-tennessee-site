import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BrandStamp } from "@/components/brand-mark";
import { CONTACT_EMAIL } from "@/components/nav-links";

const linkClass = "text-cream/75 transition-colors hover:text-brand";

export function Footer() {
  return (
    <footer className="on-ink bg-ink text-cream">
      <div className="h-1 bg-brand" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div>
          <BrandStamp
            src="/brand/house-mark.svg"
            alt="Touchdown Tennessee"
            width={360}
            height={243}
            className="h-16 sm:h-20"
          />
          <p className="mt-4 font-display text-3xl uppercase tracking-[0.08em]">Knoxville</p>
          <p className="mt-3 max-w-sm text-sm text-cream/75">
            Original marks. No licensed logos. Independent Tennessee football, from Knoxville.
          </p>
        </div>
      </div>

      <nav
        aria-label="Footer"
        className="mx-auto grid max-w-6xl grid-cols-2 gap-8 border-t border-cream/10 px-4 py-10 text-sm sm:px-6 sm:grid-cols-2"
      >
        <FooterColumn title="Saturday">
          <Link to="/saturday" className={linkClass}>
            Clubhouse
          </Link>
          <Link to="/saturday/wire" className={linkClass}>
            The Wire
          </Link>
          <Link to="/saturday/board" className={linkClass}>
            The Board
          </Link>
        </FooterColumn>
        <FooterColumn title="Company">
          <Link to="/independent" className={linkClass}>
            What independent means
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
            Contact
          </a>
        </FooterColumn>
      </nav>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-cream/70 sm:px-6">
          <p className="max-w-3xl">
            All designs are original and do not incorporate any officially licensed University of
            Tennessee, NFL, or Tennessee Titans marks. Not affiliated with, endorsed by, or
            connected to those institutions. The Wire is satire, not reporting.
          </p>
          <p>© {new Date().getFullYear()} Touchdown Tennessee · Knoxville</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xs uppercase tracking-[0.2em] text-brand">{title}</h2>
      <div className="mt-4 flex flex-col gap-3">{children}</div>
    </div>
  );
}
