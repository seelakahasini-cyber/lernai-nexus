import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({ component: Forgot });

function Forgot() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="glass w-full max-w-md p-8">
        <Link to="/" className="mb-6 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary"><Brain className="h-5 w-5 text-white" /></div>
          <span className="font-display text-xl font-bold">EduMind<span className="gradient-text">AI</span></span>
        </Link>
        <h1 className="font-display text-3xl font-bold">Reset password</h1>
        <p className="mt-1 text-sm text-muted-foreground">We'll email you a magic reset link.</p>
        <form className="mt-6 space-y-4" onSubmit={(e)=>e.preventDefault()}>
          <div><Label>Email</Label><Input type="email" placeholder="you@edumind.ai" className="mt-1.5" /></div>
          <Button className="w-full gradient-primary text-primary-foreground">Send reset link</Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Back to <Link to="/login" className="text-accent hover:underline">sign in</Link>
        </p>
      </Card>
    </div>
  );
}
