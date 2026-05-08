import { Code2, Mail, MapPin, Phone, Share2, Users } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/blogs", label: "Blogs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/help", label: "Help" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <h2 className="text-xl font-bold">SkillSync AI</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            A professional learning platform for structured courses, instructor feedback,
            support, dashboards, and AI-assisted learning workflows.
          </p>
          <div className="mt-5 flex gap-3">
            <Link aria-label="GitHub" className="rounded-card border border-border p-2 hover:bg-muted" href="https://github.com/FahimMuntasir0417">
              <Code2 className="size-4" />
            </Link>
            <Link aria-label="LinkedIn" className="rounded-card border border-border p-2 hover:bg-muted" href="https://www.linkedin.com">
              <Users className="size-4" />
            </Link>
            <Link aria-label="Facebook" className="rounded-card border border-border p-2 hover:bg-muted" href="https://www.facebook.com">
              <Share2 className="size-4" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Navigation</h3>
          <div className="mt-4 grid gap-2">
            {links.map((link) => (
              <Link className="text-sm text-muted-foreground hover:text-foreground" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Mail className="size-4" />
              support@skillsync.ai
            </span>
            <span className="flex items-center gap-2">
              <Phone className="size-4" />
              +880 1700 000000
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4" />
              Dhaka, Bangladesh
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4">
        <p className="container-shell text-sm text-muted-foreground">
          © 2026 SkillSync AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
