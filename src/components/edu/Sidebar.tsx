import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Bot, MessageSquare, BookOpen, GraduationCap,
  BarChart3, User, Settings, Shield, Sparkles, Brain, LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage, K, defaultProfile, signOut, type Profile, type Session } from "@/lib/store";
import { toast } from "sonner";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/agents", label: "AI Agents", icon: Bot },
  { to: "/chat", label: "AI Chat", icon: MessageSquare },
  { to: "/learn", label: "My Learning", icon: Sparkles },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/quiz", label: "Quiz", icon: GraduationCap },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/admin", label: "Admin", icon: Shield },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const nav = useNavigate();
  const [profile] = useLocalStorage<Profile>(K.profile, defaultProfile());
  const [session] = useLocalStorage<Session>(K.auth, null);

  const displayName = session?.name ?? profile.name;
  const initials = displayName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  const doLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut();
    toast.success("Signed out");
    nav({ to: "/login" });
  };

  return (
    <aside className="glass sticky top-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 flex-col rounded-2xl p-4 lg:flex">
      <Link to="/" className="mb-6 flex items-center gap-2 px-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary glow">
          <Brain className="h-5 w-5 text-white" />
        </div>
        <span className="font-display text-lg font-bold">EduMind<span className="gradient-text">AI</span></span>
      </Link>
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {items.map((it) => {
          const active = pathname === it.to;
          const Icon = it.icon;
          return (
            <Link key={it.to} to={it.to}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "gradient-primary text-primary-foreground glow"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}>
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{it.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-4 rounded-xl border border-border/50 bg-background/40 p-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full gradient-hero text-xs font-bold text-white">{initials || "AK"}</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{displayName}</p>
            <p className="truncate text-xs text-muted-foreground">{session ? "Pro Student" : "Guest"}</p>
          </div>
          <button onClick={doLogout} title="Sign out" className="text-muted-foreground hover:text-foreground"><LogOut className="h-4 w-4" /></button>
        </div>
      </div>
    </aside>
  );
}

export function AppShell({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) {
  return (
    <div className="mx-auto flex min-h-screen w-[min(1400px,100%)] gap-4 p-4">
      <AppSidebar />
      <main className="flex-1 min-w-0 space-y-6 animate-fade-up">
        {title && (
          <div>
            <h1 className="font-display text-3xl font-bold">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
