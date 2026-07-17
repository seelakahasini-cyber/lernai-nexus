import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/learn")({ component: Learn });

const skills = [
  { name: "Data Structures", level: 78 },
  { name: "Algorithms", level: 62 },
  { name: "System Design", level: 34 },
  { name: "SQL & Databases", level: 88 },
  { name: "Machine Learning", level: 51 },
];

const roadmap = [
  { title: "Foundations", desc: "Master arrays, strings and hashmaps", eta: "1 week", done: true },
  { title: "Intermediate DSA", desc: "Trees, graphs, recursion", eta: "3 weeks", done: true },
  { title: "Dynamic Programming", desc: "Patterns, memoization, tabulation", eta: "2 weeks", done: false, active: true },
  { title: "System Design Basics", desc: "APIs, caching, databases", eta: "3 weeks", done: false },
  { title: "Mock Interviews", desc: "Timed problem sets with AI feedback", eta: "2 weeks", done: false },
];

const topics = [
  { title: "Sliding Window Patterns", tag: "DSA", hours: 3 },
  { title: "Graph Traversal (BFS/DFS)", tag: "DSA", hours: 4 },
  { title: "Indexing & Query Plans", tag: "SQL", hours: 2 },
  { title: "Backpropagation Explained", tag: "ML", hours: 5 },
];

function Learn() {
  return (
    <AppShell title="Personalized Learning" subtitle="A roadmap built for you, updated in real time.">
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="glass p-6 lg:col-span-2">
          <div className="mb-1 flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /><span className="text-xs uppercase tracking-wider text-muted-foreground">AI-generated</span></div>
          <h3 className="font-display text-2xl font-bold">Your Roadmap: FAANG-Ready in 12 weeks</h3>
          <div className="mt-6 space-y-4">
            {roadmap.map((r, i) => (
              <div key={r.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`grid h-10 w-10 place-items-center rounded-full ${r.done ? "gradient-primary" : r.active ? "gradient-hero glow" : "bg-secondary"}`}>
                    {r.done ? <CheckCircle2 className="h-5 w-5 text-white" /> : <span className="font-bold text-white">{i+1}</span>}
                  </div>
                  {i < roadmap.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold">{r.title}</h4>
                    {r.active && <Badge className="gradient-primary text-primary-foreground">Current</Badge>}
                    <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {r.eta}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="glass p-6">
            <h3 className="font-display text-lg font-semibold">Skill Assessment</h3>
            <div className="mt-4 space-y-4">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="text-muted-foreground">{s.level}%</span>
                  </div>
                  <Progress value={s.level} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-accent" />
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider">Learning Goals</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>• Solve 200 DSA problems this quarter</li>
              <li>• Complete ML specialization</li>
              <li>• Ship 2 portfolio projects</li>
            </ul>
            <Button className="mt-4 w-full gradient-primary text-primary-foreground">Edit goals</Button>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg font-semibold">Recommended Topics</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((t) => (
            <Card key={t.title} className="glass card-hover p-5">
              <Badge variant="outline" className="mb-2 text-xs">{t.tag}</Badge>
              <h4 className="font-semibold">{t.title}</h4>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> ~{t.hours}h</span>
                <Button size="sm" variant="ghost">Start</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
