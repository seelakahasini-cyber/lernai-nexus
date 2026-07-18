import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Trophy, Zap, Target, PlayCircle, BookOpen, Sparkles, TrendingUp, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";
import {
  useLocalStorage, K, defaultProfile, defaultTasks, getStreak,
  type Profile, type Enrollment, type Task, type QuizAttempt,
} from "@/lib/store";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const catalogNames: Record<string, { title: string; agent: string }> = {
  c1: { title: "Advanced Python Mastery", agent: "Coding Mentor" },
  c2: { title: "Machine Learning A-Z", agent: "Tutor Agent" },
  c3: { title: "System Design Fundamentals", agent: "Tutor Agent" },
  c4: { title: "SQL for Analysts", agent: "Tutor Agent" },
  c5: { title: "UI/UX Design Studio", agent: "Coach Agent" },
  c6: { title: "Linear Algebra for ML", agent: "Tutor Agent" },
  c7: { title: "Spanish Conversation", agent: "Coach Agent" },
  c8: { title: "Deep Learning Pro", agent: "Coding Mentor" },
};

const badges = [
  { label: "Streak", icon: Flame, color: "from-orange-500 to-pink-500" },
  { label: "Top 5%", icon: Trophy, color: "from-yellow-400 to-orange-500" },
  { label: "Quick learner", icon: Zap, color: "from-cyan-400 to-blue-500" },
  { label: "On target", icon: Target, color: "from-green-400 to-emerald-500" },
];

function Dashboard() {
  const [profile] = useLocalStorage<Profile>(K.profile, defaultProfile());
  const [enrollments] = useLocalStorage<Enrollment[]>(K.enrollments, []);
  const [tasks, setTasks] = useLocalStorage<Task[]>(K.tasks, defaultTasks);
  const [attempts] = useLocalStorage<QuizAttempt[]>(K.quizAttempts, []);
  const [studyLog] = useLocalStorage<Record<string, number>>(K.studyLog, {});

  const streak = getStreak();
  const weekly = useMemo(() => {
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const out: { day: string; hrs: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      out.push({ day: days[d.getDay()], hrs: +(((studyLog[key] ?? 0) / 60).toFixed(1)) });
    }
    return out;
  }, [studyLog]);

  const totalWeekHrs = weekly.reduce((s, w) => s + w.hrs, 0);
  const dailyTarget = 3; // hours
  const todayHrs = weekly[weekly.length - 1]?.hrs ?? 0;
  const dailyPct = Math.min(100, Math.round((todayHrs / dailyTarget) * 100));

  const activeCourses = enrollments.slice(0, 3).map((e) => ({
    ...catalogNames[e.courseId] ?? { title: e.courseId, agent: "Tutor" },
    progress: e.progress,
  }));

  const toggleTask = (id: string) => setTasks((ts) => ts.map((t) => t.id === id ? { ...t, done: !t.done } : t));

  const stats = [
    { label: "XP Points", value: profile.xp.toLocaleString(), icon: Sparkles, trend: attempts[0] ? `+${attempts[0].xpEarned} last quiz` : "Take a quiz" },
    { label: "Streak", value: `${streak} day${streak===1?"":"s"}`, icon: Flame, trend: streak > 0 ? "🔥 Keep it up" : "Start today" },
    { label: "Courses", value: `${enrollments.length} active`, icon: BookOpen, trend: `${enrollments.filter(e=>e.progress>=80).length} near done` },
    { label: "Study time", value: `${totalWeekHrs.toFixed(1)} h`, icon: Clock, trend: "This week" },
  ];

  return (
    <AppShell title={`Welcome back, ${profile.name.split(" ")[0]} 👋`} subtitle={streak > 0 ? `You're on a ${streak}-day streak. Keep the momentum!` : "Start a quiz to build your streak."}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
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
        <Card className="glass p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Weekly Study</h3>
              <p className="text-xs text-muted-foreground">Hours per day, last 7 days</p>
            </div>
            <Badge className="gap-1 gradient-primary text-primary-foreground"><TrendingUp className="h-3 w-3" /> {totalWeekHrs.toFixed(1)}h</Badge>
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

        <Card className="glass p-6">
          <h3 className="font-display text-lg font-semibold">Daily Goal</h3>
          <p className="mt-1 text-xs text-muted-foreground">{todayHrs.toFixed(1)} / {dailyTarget} hours completed</p>
          <div className="relative mt-6 grid h-40 place-items-center">
            <svg className="h-40 w-40 -rotate-90">
              <circle cx="80" cy="80" r="68" fill="none" stroke="var(--muted)" strokeWidth="12" />
              <circle cx="80" cy="80" r="68" fill="none" stroke="url(#gradring)" strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 68 * (dailyPct/100)} ${2 * Math.PI * 68}`} strokeLinecap="round" />
              <defs>
                <linearGradient id="gradring"><stop offset="0%" stopColor="#7C3AED" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient>
              </defs>
            </svg>
            <div className="absolute text-center">
              <div className="font-display text-4xl font-black gradient-text">{dailyPct}%</div>
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
        <Card className="glass p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Continue Learning</h3>
            <Button variant="ghost" size="sm" asChild><Link to="/courses">View all</Link></Button>
          </div>
          {activeCourses.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">
              You haven't enrolled in any courses yet.
              <div className="mt-3"><Button asChild className="gradient-primary text-primary-foreground"><Link to="/courses">Browse courses</Link></Button></div>
            </div>
          ) : (
            <div className="space-y-4">
              {activeCourses.map((c) => (
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
                  <Button asChild size="sm" className="gradient-primary text-primary-foreground"><Link to="/courses">Resume</Link></Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="space-y-5">
          <Card className="glass p-6">
            <h3 className="font-display text-lg font-semibold">Upcoming Tasks</h3>
            <ul className="mt-3 space-y-3">
              {tasks.map((t) => (
                <li key={t.id} className="flex items-center gap-3 text-sm">
                  <input type="checkbox" checked={t.done} onChange={()=>toggleTask(t.id)} className="h-4 w-4 accent-primary" />
                  <div className="flex-1 min-w-0">
                    <div className={`truncate ${t.done ? "line-through text-muted-foreground" : ""}`}>{t.title}</div>
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
