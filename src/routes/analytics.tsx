import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Trophy, TrendingUp, Clock, Target } from "lucide-react";
import { useMemo } from "react";
import { useLocalStorage, K, defaultSkills, defaultProfile, type QuizAttempt, type Profile, type Skill, type Enrollment } from "@/lib/store";

export const Route = createFileRoute("/analytics")({ component: Analytics });

const colors = ["#7C3AED", "#06B6D4", "#a78bfa", "#f472b6"];

function Analytics() {
  const [attempts] = useLocalStorage<QuizAttempt[]>(K.quizAttempts, []);
  const [studyLog] = useLocalStorage<Record<string, number>>(K.studyLog, {});
  const [skills] = useLocalStorage<Skill[]>(K.skills, defaultSkills);
  const [profile] = useLocalStorage<Profile>(K.profile, defaultProfile());
  const [enrollments] = useLocalStorage<Enrollment[]>(K.enrollments, []);

  const weekly = useMemo(() => {
    const out: { d: string; hrs: number }[] = [];
    for (let w = 6; w >= 0; w--) {
      let sum = 0;
      for (let d = 0; d < 7; d++) {
        const date = new Date();
        date.setDate(date.getDate() - (w * 7 + d));
        sum += studyLog[date.toISOString().slice(0, 10)] ?? 0;
      }
      out.push({ d: `W${7 - w}`, hrs: +(sum / 60).toFixed(1) });
    }
    return out;
  }, [studyLog]);

  const monthly = useMemo(() => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const totals: Record<string, number> = {};
    attempts.forEach((a) => {
      const d = new Date(a.at);
      const k = `${d.getFullYear()}-${d.getMonth()}`;
      totals[k] = (totals[k] ?? 0) + Math.round((a.score / a.total) * 100);
    });
    const now = new Date();
    const arr: { m: string; p: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const k = `${d.getFullYear()}-${d.getMonth()}`;
      arr.push({ m: months[d.getMonth()], p: totals[k] ?? 0 });
    }
    return arr;
  }, [attempts]);

  const totalStudyMin = Object.values(studyLog).reduce((s, v) => s + v, 0);
  const totalHrs = (totalStudyMin / 60).toFixed(1);
  const avgAccuracy = attempts.length
    ? Math.round(attempts.reduce((s, a) => s + (a.score / a.total) * 100, 0) / attempts.length)
    : 0;
  const activeDays = Object.keys(studyLog).length;
  const consistency = Math.min(100, Math.round((activeDays / 30) * 100));

  const subjects = skills.map((s) => ({ subject: s.name, A: s.level }));

  const aiUsage = [
    { name: "Tutor", value: Math.max(1, attempts.length * 3) },
    { name: "Quiz", value: Math.max(1, attempts.length) },
    { name: "Planner", value: enrollments.length || 1 },
    { name: "Coding Mentor", value: Math.max(1, Math.round(attempts.length / 2)) },
  ];

  const timeline = [
    ...(profile.xp >= 100 ? [{ title: "First 100 XP", when: "unlocked", icon: "🎯" }] : []),
    ...(attempts.length >= 1 ? [{ title: "First quiz completed", when: "unlocked", icon: "📝" }] : []),
    ...(profile.xp >= 1000 ? [{ title: "1,000 XP club", when: "unlocked", icon: "⭐" }] : []),
    ...(enrollments.length >= 3 ? [{ title: "3+ courses enrolled", when: "unlocked", icon: "📚" }] : []),
    ...(avgAccuracy >= 80 ? [{ title: "80% quiz accuracy", when: "unlocked", icon: "🏆" }] : []),
  ];

  return (
    <AppShell title="Analytics" subtitle="Deep insights into how you learn.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Total study time", v: `${totalHrs} h`, t: `${activeDays} active days`, i: Clock },
          { l: "Accuracy", v: `${avgAccuracy}%`, t: `${attempts.length} attempts`, i: Target },
          { l: "Consistency", v: `${consistency}%`, t: "30-day window", i: TrendingUp },
          { l: "XP earned", v: profile.xp.toLocaleString(), t: `${timeline.length} achievements`, i: Trophy },
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
        <h3 className="mb-4 font-display text-lg font-semibold">Recent Quiz Attempts</h3>
        {attempts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No quiz attempts yet. Take one to see analytics fill in.</p>
        ) : (
          <div className="space-y-2">
            {attempts.slice(0, 8).map((a) => {
              const pct = Math.round((a.score / a.total) * 100);
              return (
                <div key={a.id} className="glass flex items-center gap-3 rounded-xl p-3 text-sm">
                  <div className="grid h-9 w-9 place-items-center rounded-lg gradient-primary text-xs font-bold text-white">{pct}%</div>
                  <div className="flex-1">
                    <div className="font-medium">{a.topic}</div>
                    <div className="text-xs text-muted-foreground">{new Date(a.at).toLocaleString()} · {a.timeSeconds}s · +{a.xpEarned} XP</div>
                  </div>
                  <Badge variant="outline">{a.score}/{a.total}</Badge>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {timeline.length > 0 && (
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
      )}
    </AppShell>
  );
}
