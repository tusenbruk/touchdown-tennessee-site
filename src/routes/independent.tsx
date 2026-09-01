import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/independent")({ component: IndependentPage });

function IndependentPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <p className="font-display text-xs tracking-[0.22em] text-brand">A short guide</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">What independent actually means</h1>
      <p className="mt-6 text-lg">
        Licensed gear pays a school for the right to print its marks. Part of the price is that
        permission. The designs have to clear a brand office. You get the letter, the mascot, the
        song title.
      </p>
      <p className="mt-4 text-muted">
        Independent gear pays for the drawing and the garment. We do not use protected logos,
        wordmarks, slogans, checkerboard, or player names. The canvas is the shape of the state —
        geography we actually own.
      </p>
      <h2 className="mt-12 text-2xl">What we will not print</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
        <li>University letters, mascots, seals, or endzone patterns</li>
        <li>Trademarked chants, song titles, and slogans</li>
        <li>Player names, faces, signatures, or famous jersey numbers</li>
        <li>Rival school marks, even as a joke</li>
      </ul>
      <h2 className="mt-12 text-2xl">What we will print</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
        <li>The outline of Tennessee with the word TOUCHDOWN</li>
        <li>Classics: tee, signature tee, hoodie, hat, phone case</li>
        <li>1794: Rifleman, Blount College, Crockett</li>
      </ul>
      <p className="mt-8 text-sm text-muted">
        If a design needs a protected logo to work, it is a bad design. We are not affiliated with,
        sponsored by, or endorsed by the University of Tennessee or any professional club. Questions:{" "}
        <a href="mailto:touchdowntennessee@gmail.com" className="text-ink underline">
          touchdowntennessee@gmail.com
        </a>
        .
      </p>
      <h2 className="mt-12 text-2xl">For X</h2>
      <p className="mt-4 text-sm text-muted">
        Right-click, save image. Square is the profile photo. Wide is the header.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a
          href="/brand/x-avatar.png"
          download="touchdown-tennessee-x-avatar.png"
          className="block overflow-hidden bg-ink"
        >
          <img src="/brand/x-avatar.png" alt="X profile photo" className="aspect-square w-full object-cover" />
          <span className="block px-3 py-2 font-display text-xs uppercase tracking-[0.16em] text-cream">
            Profile photo
          </span>
        </a>
        <a
          href="/brand/x-header.jpg"
          download="touchdown-tennessee-x-header.jpg"
          className="block overflow-hidden bg-ink"
        >
          <img src="/brand/x-header.jpg" alt="X header" className="aspect-3/1 w-full object-cover" />
          <span className="block px-3 py-2 font-display text-xs uppercase tracking-[0.16em] text-cream">
            Header
          </span>
        </a>
      </div>
      <Link to="/shop" className={cn(buttonVariants({ variant: "ink" }), "mt-10 inline-flex")}>
        Back to the shop
      </Link>
    </article>
  );
}
