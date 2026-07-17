import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Github, Mail } from "lucide-react";

export const Route = createFileRoute("/login")({ component: LoginPage });

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4"><path fill="#EA4335" d="M12 5c1.6 0 3 .55 4.1 1.6L19 3.7C17.1 2 14.7 1 12 1 7.3 1 3.3 3.7 1.4 7.6l3.4 2.6C5.7 7.1 8.6 5 12 5z"/><path fill="#4285F4" d="M23 12c0-.8-.1-1.5-.2-2.2H12v4.4h6.2c-.3 1.4-1.1 2.5-2.3 3.3l3.5 2.7c2-1.9 3.6-4.7 3.6-8.2z"/><path fill="#FBBC05" d="M4.8 14.2c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2L1.4 7.2C.5 8.9 0 10.9 0 12s.5 3.1 1.4 4.8l3.4-2.6z"/><path fill="#34A853" d="M12 23c3 0 5.6-1 7.5-2.7l-3.5-2.7c-1 .7-2.3 1.1-4 1.1-3.4 0-6.3-2.1-7.2-5.2l-3.4 2.6C3.3 20.3 7.3 23 12 23z"/></svg>
  );
}

function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0" style={{background:"var(--gradient-hero)"}} />
        <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize:"32px 32px"}} />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 backdrop-blur"><Brain className="h-5 w-5" /></div>
            <span className="font-display text-xl font-bold">EduMindAI</span>
          </Link>
          <div>
            <h2 className="font-display text-4xl font-bold">Welcome back to your learning journey</h2>
            <p className="mt-3 max-w-md text-white/80">Your AI tutors, planners and coaches are ready to pick up right where you left off.</p>
          </div>
          <div className="text-sm text-white/70">"EduMind changed how I study." — Priya, CS undergrad</div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="glass w-full max-w-md p-8">
          <h1 className="font-display text-3xl font-bold">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Welcome back. Enter your details.</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="glass"><GoogleIcon /> Google</Button>
            <Button variant="outline" className="glass"><Github className="h-4 w-4" /> GitHub</Button>
          </div>

          <div className="my-6 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
          </div>

          <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@edumind.ai" className="mt-1.5" />
            </div>
            <div>
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-accent hover:underline">Forgot?</Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground">
              <Mail className="mr-2 h-4 w-4" /> Sign in with Email
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account? <Link to="/register" className="text-accent hover:underline">Create one</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
