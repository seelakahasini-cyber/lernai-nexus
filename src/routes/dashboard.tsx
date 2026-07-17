import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Trophy, Zap, Target, PlayCircle, BookOpen, Sparkles, TrendingUp, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const weekly = [
  { day: "Mon", hrs: 2.1 }, { day: "Tue", hrs: 3.4 }, { day: "Wed", hrs: 1.5 },
  { day: "Thu", hrs: 4.2 }, { day: "Fri", hrs: 3.0 }, { day: "Sat", hrs: 5.1 }, { day: "Sun", hrs: 2.8 },
];

const badges = [
  { label: "7-day streak", icon: Flame, color: "from-orange-500 to-pink-500" },
  { label: "Top 5%", icon: Trophy, color: "from-yellow-400 to-orange-500" },
  { label: "Quick learner", icon: Zap, color: "from-cyan-400 to-blue-500" },
  { label: "On target", icon: Target, color: "from-green-400 to-emerald-500" },
];

const courses = [
  { title: "Advanced Python", progress: 62, agent: "Coding Mentor" },
  { title: "System Design", progress: 34, agent: "Tutor Agent" },
  { title: "Machine Learning", progress: 81, agent: "Tutor Agent" },
];

const tasks = [
  { title: "Complete SQL quiz", due: "Today", tag: "Quiz" },
  { title: "Watch: Neural Nets pt.3", due: "Tomorrow", tag: "Video" },
  { title: "Practice Recursion set", due: "Fri", tag: "Practice" },
];

function Dashboard() {
  return (
    <AppShell title="Welcome back, Alex 👋" subtitle="You're on a 7-day streak. Keep the momentum!">
      {/* Top stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "XP Points", value: "12,480", icon: Sparkles, trend: "+340 today" },
          { label: "Streak", value: "7 days", icon: Flame, trend: "🔥 On fire" },
          { label: "Courses", value: "8 active", icon: BookOpen, trend: "3 near done" },
          { label: "Study time", value: "22.1 h", icon: Clock, trend: "This week" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="glass card-hover p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary"><Icon className="h-4 w-4 text-white" /></div>
              </div>
              <div className="mt-3 font-display text-3xl font-black">{s.value}</div>
              <div className="mt-1 text-xs text-accent">{s.trend}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Weekly chart */}
        <Card className="glass p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Weekly Study</h3>
              <p className="text-xs text-muted-foreground">Hours per day, last 7 days</p>
            </div>
            <Badge className="gap-1 gradient-primary text-primary-foreground"><TrendingUp className="h-3 w-3" /> +18%</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekly}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 12 }} />
                <Area type="monotone" dataKey="hrs" stroke="#7C3AED" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Daily progress */}
        <Card className="glass p-6">
          <h3 className="font-display text-lg font-semibold">Daily Goal</h3>
          <p className="mt-1 text-xs text-muted-foreground">2.5 / 3 hours completed</p>
          <div className="relative mt-6 grid h-40 place-items-center">
            <svg className="h-40 w-40 -rotate-90">
              <circle cx="80" cy="80" r="68" fill="none" stroke="var(--muted)" strokeWidth="12" />
              <circle cx="80" cy="80" r="68" fill="none" stroke="url(#gradring)" strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 68 * 0.83} ${2 * Math.PI * 68}`} strokeLinecap="round" />
              <defs>
                <linearGradient id="gradring"><stop offset="0%" stopColor="#7C3AED" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient>
              </defs>
            </svg>
            <div className="absolute text-center">
              <div className="font-display text-4xl font-black gradient-text">83%</div>
              <div className="text-xs text-muted-foreground">of goal</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {badges.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.label} className="flex flex-col items-center gap-1">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${b.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-[10px] text-muted-foreground text-center">{b.label}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Continue Learning */}
        <Card className="glass p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Continue Learning</h3>
            <Button variant="ghost" size="sm" asChild><Link to="/courses">View all</Link></Button>
          </div>
          <div className="space-y-4">
            {courses.map((c) => (
              <div key={c.title} className="glass flex items-center gap-4 rounded-2xl p-4 card-hover">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-hero">
                  <PlayCircle className="h-6 w-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-medium">{c.title}</p>
                    <span className="text-xs text-muted-foreground">{c.progress}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">via {c.agent}</p>
                  <Progress value={c.progress} className="mt-2 h-1.5" />
                </div>
                <Button size="sm" className="gradient-primary text-primary-foreground">Resume</Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Tasks + AI recommendations */}
        <div className="space-y-5">
          <Card className="glass p-6">
            <h3 className="font-display text-lg font-semibold">Upcoming Tasks</h3>
            <ul className="mt-3 space-y-3">
              {tasks.map((t) => (
                <li key={t.title} className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full gradient-primary" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{t.title}</div>
                    <div className="text-xs text-muted-foreground">{t.due}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">{t.tag}</Badge>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="glass p-6">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider">AI Suggests</h3>
            </div>
            <p className="text-sm text-muted-foreground">Based on recent quizzes, try focusing on <b className="text-foreground">Dynamic Programming</b> for 20 minutes today.</p>
            <Button size="sm" className="mt-3 w-full gradient-primary text-primary-foreground" asChild>
              <Link to="/chat">Ask Tutor Agent</Link>
            </Button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
