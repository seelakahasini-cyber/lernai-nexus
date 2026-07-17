import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Activity, BookOpen, Bot, DollarSign, ServerCog, HeartPulse, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/admin")({ component: Admin });

const traffic = Array.from({length: 14}, (_, i) => ({ d: `D${i+1}`, u: 800 + Math.round(Math.random()*400) }));

const users = [
  { name: "Priya Shah", email: "priya@example.com", plan: "Pro", status: "active", joined: "Jun 2026" },
  { name: "Marcus Ford", email: "marcus@example.com", plan: "Teams", status: "active", joined: "May 2026" },
  { name: "Aisha Rao", email: "aisha@example.com", plan: "Free", status: "inactive", joined: "Apr 2026" },
  { name: "Kenji Watanabe", email: "kenji@example.com", plan: "Pro", status: "active", joined: "Mar 2026" },
  { name: "Sofia Perez", email: "sofia@example.com", plan: "Pro", status: "active", joined: "Feb 2026" },
];

function Admin() {
  return (
    <AppShell title="Admin Dashboard" subtitle="Platform overview and system health.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Total users", v: "124,893", t: "+12.4%", i: Users },
          { l: "Active users", v: "48,120", t: "+8.1%", i: Activity },
          { l: "Courses", v: "542", t: "3 new", i: BookOpen },
          { l: "AI requests", v: "8.2M", t: "24h", i: Bot },
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

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="glass p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Active users (14d)</h3>
            <Badge className="gradient-primary text-primary-foreground gap-1"><DollarSign className="h-3 w-3" /> $84,220 MRR</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={traffic}>
                <XAxis dataKey="d" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 12 }} />
                <Line type="monotone" dataKey="u" stroke="#7C3AED" strokeWidth={3} dot={{ fill: "#06B6D4", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">System Health</h3>
          <div className="space-y-3">
            {[
              { l: "API latency", v: "124ms", ok: true, i: Zap },
              { l: "Uptime", v: "99.98%", ok: true, i: HeartPulse },
              { l: "AI gateway", v: "Healthy", ok: true, i: ServerCog },
              { l: "Queue depth", v: "Normal", ok: true, i: Activity },
            ].map((h) => {
              const Icon = h.i;
              return (
                <div key={h.l} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="flex-1 text-sm">{h.l}</span>
                  <span className="text-sm font-semibold">{h.v}</span>
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-glow" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="glass p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">User Management</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.email}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-full gradient-primary text-xs font-bold text-white">{u.name.split(" ").map(w=>w[0]).join("")}</div>
                    {u.name}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell><Badge variant="outline">{u.plan}</Badge></TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1.5 text-xs ${u.status==="active"?"text-green-400":"text-muted-foreground"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${u.status==="active"?"bg-green-400":"bg-muted-foreground"}`} />
                    {u.status}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{u.joined}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </AppShell>
  );
}
