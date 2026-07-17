import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Edit3, Mail, MapPin, Calendar, Target } from "lucide-react";

export const Route = createFileRoute("/profile")({ component: Profile });

const skills = ["Python", "SQL", "Machine Learning", "React", "System Design", "Data Viz"];
const certs = [
  { t: "Advanced Python", d: "Issued Jun 2026", color: "from-indigo-500 to-purple-500" },
  { t: "ML A-Z", d: "Issued May 2026", color: "from-cyan-500 to-blue-500" },
  { t: "SQL Analyst", d: "Issued Mar 2026", color: "from-emerald-500 to-teal-500" },
];
const goals = [
  { t: "Solve 200 DSA problems", p: "78/200" },
  { t: "Complete ML specialization", p: "3/5 courses" },
  { t: "Ship portfolio project", p: "In progress" },
];

function Profile() {
  return (
    <AppShell>
      <Card className="glass overflow-hidden p-0">
        <div className="relative h-40" style={{background:"var(--gradient-hero)"}}>
          <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 20% 30%, white 1px, transparent 1px)", backgroundSize:"24px 24px"}} />
        </div>
        <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-end -mt-20">
          <div className="grid h-32 w-32 place-items-center rounded-3xl border-4 border-background gradient-primary font-display text-4xl font-black text-white glow">AK</div>
          <div className="min-w-0">
            <h2 className="font-display text-3xl font-bold">Alex Kumar</h2>
            <p className="text-muted-foreground">CS Undergrad · Pro Learner · 12,480 XP</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> alex@edumind.ai</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Bengaluru, India</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Joined Feb 2025</span>
            </div>
          </div>
          <Button className="gradient-primary text-primary-foreground"><Edit3 className="mr-2 h-4 w-4" /> Edit profile</Button>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="glass p-6">
          <h3 className="font-display text-lg font-semibold">Skills</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s) => (<Badge key={s} className="glass border-primary/30 px-3 py-1.5">{s}</Badge>))}
          </div>
        </Card>

        <Card className="glass p-6 lg:col-span-2">
          <h3 className="font-display text-lg font-semibold">Certificates</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {certs.map((c) => (
              <div key={c.t} className={`rounded-2xl bg-gradient-to-br ${c.color} p-4 text-white`}>
                <Award className="h-6 w-6 mb-2" />
                <div className="font-semibold">{c.t}</div>
                <div className="text-xs opacity-80">{c.d}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass p-6 lg:col-span-3">
          <div className="mb-3 flex items-center gap-2"><Target className="h-4 w-4 text-accent" /><h3 className="font-display text-lg font-semibold">Learning Goals</h3></div>
          <div className="grid gap-3 sm:grid-cols-3">
            {goals.map((g) => (
              <div key={g.t} className="glass rounded-2xl p-4">
                <div className="text-sm font-medium">{g.t}</div>
                <div className="mt-1 text-xs text-muted-foreground">{g.p}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
