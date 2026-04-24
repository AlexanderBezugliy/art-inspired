import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-12 px-8 md:px-28 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-6">
      <p className="text-muted-foreground text-sm">
        © 2026 Mindloop. All rights reserved.
      </p>

      <div className="flex items-center gap-8">
        {["Privacy", "Terms", "Contact"].map((link) => (
          <Link
            key={link}
            href={`/${link.toLowerCase()}`}
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            {link}
          </Link>
        ))}
      </div>
    </footer>
  );
};
