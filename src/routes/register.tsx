import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";

export const Route = createFileRoute("/register")({ component: Register });

function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="glass w-full max-w-md p-8">
        <Link to="/" className="mb-6 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary glow"><Brain className="h-5 w-5 text-white" /></div>
          <span className="font-display text-xl font-bold">EduMind<span className="gradient-text">AI</span></span>
        </Link>
        <h1 className="font-display text-3xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Start learning with AI in minutes.</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="outline" className="glass">Google</Button>
          <Button variant="outline" className="glass">GitHub</Button>
        </div>
        <div className="my-6 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
        </div>

        <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
          <div><Label>Full name</Label><Input placeholder="Alex Kumar" className="mt-1.5" /></div>
          <div><Label>Email</Label><Input type="email" placeholder="you@edumind.ai" className="mt-1.5" /></div>
          <div><Label>Password</Label><Input type="password" placeholder="At least 8 characters" className="mt-1.5" /></div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground">Create Account</Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-accent hover:underline">Sign in</Link>
        </p>
      </Card>
    </div>
  );
}
