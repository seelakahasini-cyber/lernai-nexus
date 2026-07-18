import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { signUp } from "@/lib/store";

export const Route = createFileRoute("/register")({ component: Register });

function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || password.length < 8) {
      toast.error("Fill all fields (password ≥ 8 chars)");
      return;
    }
    const r = signUp(name.trim(), email.trim(), password);
    if (!r.ok) { toast.error(r.error); return; }
    toast.success("Account created!");
    nav({ to: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="glass w-full max-w-md p-8">
        <Link to="/" className="mb-6 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary glow"><Brain className="h-5 w-5 text-white" /></div>
          <span className="font-display text-xl font-bold">EduMind<span className="gradient-text">AI</span></span>
        </Link>
        <h1 className="font-display text-3xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Start learning with AI in minutes.</p>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <div><Label>Full name</Label><Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Alex Kumar" className="mt-1.5" /></div>
          <div><Label>Email</Label><Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@edumind.ai" className="mt-1.5" /></div>
          <div><Label>Password</Label><Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="At least 8 characters" className="mt-1.5" /></div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground">Create Account</Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-accent hover:underline">Sign in</Link>
        </p>
      </Card>
    </div>
  );
}
