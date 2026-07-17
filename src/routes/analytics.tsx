import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Trophy, TrendingUp, Clock, Target } from "lucide-react";

export const Route = createFileRoute("/analytics")({ component: Analytics });

const weekly = [
  { d: "W1", hrs: 12 }, { d: "W2", hrs: 18 }, { d: "W3", hrs: 15 },
  { d: "W4", hrs: 22 }, { d: "W5", hrs: 27 }, { d: "W6", hrs: 24 }, { d: "W7", hrs: 31 },
];
const monthly = [
  { m: "Jan", p: 40 }, { m: "Feb", p: 55 }, { m: "Mar", p: 62 },
  { m: "Apr", p: 71 }, { m: "May", p: 78 }, { m: "Jun", p: 85 },
];
const subjects = [
  { subject: "Python", A: 90 }, { subject: "SQL", A: 85 }, { subject: "ML", A: 65 },
  { subject: "DSA", A: 72 }, { subject: "System Design", A: 45 }, { subject: "Math", A: 78 },
];
const aiUsage = [
  { name: "Tutor", value: 42 }, { name: "Quiz", value: 28 },
  { name: "Planner", value: 12 }, { name: "Coding Mentor", value: 18 },
];
const colors = ["#7C3AED", "#06B6D4", "#a78bfa", "#f472b6"];

const timeline = [
  { title: "First 100 XP", when: "3 months ago", icon: "🎯" },
  { title: "7-day streak", when: "2 months ago", icon: "🔥" },
  { title: "Top 5% learner", when: "1 month ago", icon: "🏆" },
  { title: "Completed ML A-Z", when: "2 weeks ago", icon: "📚" },
  { title: "10,000 XP club", when: "Yesterday", icon: "⭐" },
];

function Analytics() {
  return (
    <AppShell title="Analytics" subtitle="Deep insights into how you learn.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Total study time", v: "148 h", t: "+12% this month", i: Clock },
          { l: "Completion", v: "72%", t: "on target", i: Target },
          { l: "Consistency", v: "91%", t: "+5 vs last", i: TrendingUp },
          { l: "Achievements", v: "24", t: "3 unlocked", i: Trophy },
        ].map((s) => {
          const Icon = s.i;
          return (
            <Card key={s.l} className="glass card-hover p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</span>
                <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary"><Icon className="h-4 w-4 text-white" /></div>
              </div>
              <div className="mt-3 font-display text-3xl font-black">{s.v}</div>
              <div className="text-xs text-accent">{s.t}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="glass p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">Weekly Learning Hours</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekly}>
                <XAxis dataKey="d" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 12 }} />
                <Bar dataKey="hrs" fill="url(#bg1)" radius={[8,8,0,0]} />
                <defs><linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C3AED" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient></defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">Monthly Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <XAxis dataKey="m" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 12 }} />
                <Line type="monotone" dataKey="p" stroke="#06B6D4" strokeWidth={3} dot={{ fill: "#7C3AED", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">Subject Performance</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={subjects}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" stroke="#aaa" fontSize={11} />
                <PolarRadiusAxis stroke="#333" fontSize={10} />
                <Radar dataKey="A" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">AI Agent Usage</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={aiUsage} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4}>
                  {aiUsage.map((_, i) => <Cell key={i} fill={colors[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 12 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="glass p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Achievement Timeline</h3>
        <div className="space-y-4">
          {timeline.map((t, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-primary text-lg">{t.icon}</div>
              <div className="flex-1"><div className="font-medium">{t.title}</div><div className="text-xs text-muted-foreground">{t.when}</div></div>
              <Badge variant="outline">Unlocked</Badge>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
