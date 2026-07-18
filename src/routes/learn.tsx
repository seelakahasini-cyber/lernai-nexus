import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Target, Clock, CheckCircle2, Plus, X } from "lucide-react";
import { useState } from "react";
import { useLocalStorage, K, defaultGoals, defaultSkills, type Goal, type Skill } from "@/lib/store";

export const Route = createFileRoute("/learn")({ component: Learn });

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
  const [goals, setGoals] = useLocalStorage<Goal[]>(K.goals, defaultGoals);
  const [skills, setSkills] = useLocalStorage<Skill[]>(K.skills, defaultSkills);
  const [editing, setEditing] = useState(false);
  const [newGoal, setNewGoal] = useState("");

  const addGoal = () => {
    const t = newGoal.trim(); if (!t) return;
    setGoals((g) => [...g, { id: crypto.randomUUID(), text: t, done: false }]);
    setNewGoal("");
  };
  const toggleGoal = (id: string) => setGoals((g) => g.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  const removeGoal = (id: string) => setGoals((g) => g.filter((x) => x.id !== id));
  const practice = (name: string) => {
    setSkills((sk) => sk.map((s) => (s.name === name ? { ...s, level: Math.min(100, s.level + 5) } : s)));
  };

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
                    <button onClick={()=>practice(s.name)} className="text-xs text-accent hover:underline">+5% practice</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={s.level} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground w-10 text-right">{s.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-accent" />
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider">Learning Goals</h3>
            </div>
            {editing ? (
              <div className="mt-3 space-y-2">
                {goals.map((g) => (
                  <div key={g.id} className="flex items-center gap-2">
                    <input type="checkbox" checked={g.done} onChange={()=>toggleGoal(g.id)} className="h-4 w-4 accent-primary" />
                    <span className={`flex-1 text-sm ${g.done ? "line-through text-muted-foreground" : ""}`}>{g.text}</span>
                    <button onClick={()=>removeGoal(g.id)}><X className="h-3 w-3 text-muted-foreground hover:text-destructive" /></button>
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <Input value={newGoal} onChange={(e)=>setNewGoal(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&addGoal()} placeholder="New goal…" />
                  <Button size="icon" onClick={addGoal} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4" /></Button>
                </div>
                <Button className="w-full" variant="outline" onClick={()=>setEditing(false)}>Done</Button>
              </div>
            ) : (
              <>
                <ul className="mt-3 space-y-2 text-sm">
                  {goals.map((g) => (
                    <li key={g.id} className={g.done ? "line-through text-muted-foreground" : ""}>• {g.text}</li>
                  ))}
                  {goals.length === 0 && <li className="text-muted-foreground">No goals yet</li>}
                </ul>
                <Button className="mt-4 w-full gradient-primary text-primary-foreground" onClick={()=>setEditing(true)}>Edit goals</Button>
              </>
            )}
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
