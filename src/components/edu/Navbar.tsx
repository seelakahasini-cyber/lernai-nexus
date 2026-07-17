import { Link, useRouterState } from "@tanstack/react-router";
import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/agents", label: "AI Agents" },
  { to: "/chat", label: "Chat" },
  { to: "/courses", label: "Courses" },
  { to: "/analytics", label: "Analytics" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(1200px,calc(100%-2rem))]">
      <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 shadow-lg">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary glow">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold">EduMind<span className="gradient-text">AI</span></span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-white/5",
                pathname === l.to ? "text-foreground bg-white/5" : "text-muted-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild><Link to="/login">Sign in</Link></Button>
          <Button size="sm" asChild className="gradient-primary text-primary-foreground hover:opacity-90">
            <Link to="/register">Get Started</Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="glass mt-2 rounded-2xl p-3 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm hover:bg-white/5">{l.label}</Link>
          ))}
          <div className="mt-2 flex gap-2 px-1">
            <Button variant="ghost" size="sm" asChild className="flex-1"><Link to="/login">Sign in</Link></Button>
            <Button size="sm" asChild className="flex-1 gradient-primary text-primary-foreground"><Link to="/register">Start</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
}
