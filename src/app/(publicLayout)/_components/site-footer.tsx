import { Code2, Mail, MapPin, Phone, Share2, Sparkles, Users } from "lucide-react";
import Link from "next/link";

const productLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/blogs", label: "Blog" },
  { href: "/support", label: "Support" },
  { href: "/help", label: "Helpdesk" },
];

const resourceLinks = [
  { href: "/roadmap-generator", label: "AI Roadmap" },
  { href: "/skill-gap-analyzer", label: "Skill Gap" },
  { href: "/project-recommender", label: "Projects" },
  { href: "/ai-chat", label: "AI Chat" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const socialLinks = [
  { href: "https://github.com/FahimMuntasir0417", label: "GitHub", icon: Code2 },
  { href: "https://www.linkedin.com/in/md-fahim-muntasir-aa536b366/", label: "LinkedIn", icon: Users },
  { href: "https://www.facebook.com/mohammad.fahim.muntasir", label: "Facebook", icon: Share2 },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="w-fit text-sm font-medium text-muted-foreground transition hover:text-primary"
      href={href}
    >
      {label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/90">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr_1fr]">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-card bg-primary text-primary-foreground shadow-[0_12px_30px_color-mix(in_srgb,var(--primary)_22%,transparent)]">
              <Sparkles className="size-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold">SkillSync AI</h2>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                AI Learning Platform
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            A professional learning platform for courses, dashboards, support, notifications, and real AI-powered study workflows.
          </p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((item) => (
              <Link
                aria-label={item.label}
                className="rounded-card border border-border bg-card p-2.5 transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                href={item.href}
                key={item.label}
                target="_blank"
              >
                <item.icon className="size-4" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.12em]">Product</h3>
          <div className="mt-4 grid gap-2">
            {productLinks.map((link) => (
              <FooterLink href={link.href} key={link.href} label={link.label} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.12em]">AI Tools</h3>
          <div className="mt-4 grid gap-2">
            {resourceLinks.map((link) => (
              <FooterLink href={link.href} key={link.href} label={link.label} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.12em]">Company</h3>
          <div className="mt-4 grid gap-2">
            {companyLinks.map((link) => (
              <FooterLink href={link.href} key={link.href} label={link.label} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.12em]">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <Link className="flex items-start gap-2 transition hover:text-primary" href="mailto:fahimmuntasirbejoy@gmail.com">
              <Mail className="mt-0.5 size-4 shrink-0" />
              <span className="break-all">fahimmuntasirbejoy@gmail.com</span>
            </Link>
            <Link className="flex items-center gap-2 transition hover:text-primary" href="https://wa.me/8801571042536" target="_blank">
              <Phone className="size-4 shrink-0" />
              01571042536
            </Link>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" />
              Dhaka, Bangladesh
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-4">
        <div className="container-shell flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SkillSync AI. All rights reserved.</p>
          <p>Built by Md Fahim Muntasir</p>
        </div>
      </div>
    </footer>
  );
}
