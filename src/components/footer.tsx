import { BrandStamp } from "@/components/brand-mark";
import { CONTACT_EMAIL } from "@/components/nav-links";

export function Footer() {
  return (
    <footer className="on-ink bg-ink text-cream">
      <div className="h-1 bg-brand" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <BrandStamp
          src="/brand/house-mark.svg"
          alt="Touchdown Tennessee"
          width={360}
          height={243}
          className="h-16 sm:h-20"
        />
        <p className="mt-4 font-display text-3xl uppercase tracking-[0.08em]">Knoxville</p>
        <p className="mt-3 max-w-sm text-sm text-cream/75">
          Original marks, not licensed ones. No university letters, mascots, or slogans — just the
          outline of the state and an opinion about Saturday.
        </p>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="kicker">This domain is for sale</p>
          <p className="mt-3 max-w-xl text-base text-cream/85">
            Touchdowntennessee.com, the mark, and everything on this page. Serious enquiries to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Touchdowntennessee.com`}
              className="text-cream underline decoration-brand decoration-2 underline-offset-4 hover:text-brand"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-cream/70 sm:px-6">
          <p className="max-w-3xl">
            Not affiliated with, endorsed by, or connected to the university in Knoxville, the
            league, or its Nashville franchise.
          </p>
          <p>© {new Date().getFullYear()} Touchdown Tennessee · Knoxville</p>
        </div>
      </div>
    </footer>
  );
}
