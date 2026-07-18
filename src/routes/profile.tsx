import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Award, Edit3, Mail, MapPin, Calendar, Target, Save, X, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocalStorage, K, defaultProfile, defaultGoals, type Profile, type Goal } from "@/lib/store";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

const skills = ["Python", "SQL", "Machine Learning", "React", "System Design", "Data Viz"];
const certs = [
  { t: "Advanced Python", d: "Issued Jun 2026", color: "from-indigo-500 to-purple-500" },
  { t: "ML A-Z", d: "Issued May 2026", color: "from-cyan-500 to-blue-500" },
  { t: "SQL Analyst", d: "Issued Mar 2026", color: "from-emerald-500 to-teal-500" },
];

function ProfilePage() {
  const [profile, setProfile] = useLocalStorage<Profile>(K.profile, defaultProfile());
  const [goals, setGoals] = useLocalStorage<Goal[]>(K.goals, defaultGoals);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [newGoal, setNewGoal] = useState("");

  const startEdit = () => { setDraft(profile); setEditing(true); };
  const save = () => {
    const initials = draft.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
    setProfile({ ...draft, avatarInitials: initials });
    setEditing(false);
    toast.success("Profile updated");
  };

  const addGoal = () => {
    const t = newGoal.trim();
    if (!t) return;
    setGoals((g) => [...g, { id: crypto.randomUUID(), text: t, done: false }]);
    setNewGoal("");
  };
  const toggleGoal = (id: string) =>
    setGoals((g) => g.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  const removeGoal = (id: string) => setGoals((g) => g.filter((x) => x.id !== id));

  return (
    <AppShell>
      <Card className="glass overflow-hidden p-0">
        <div className="relative h-40" style={{background:"var(--gradient-hero)"}}>
          <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 20% 30%, white 1px, transparent 1px)", backgroundSize:"24px 24px"}} />
        </div>
        <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-end -mt-20">
          <div className="grid h-32 w-32 place-items-center rounded-3xl border-4 border-background gradient-primary font-display text-4xl font-black text-white glow">
            {profile.avatarInitials || "AK"}
          </div>
          <div className="min-w-0">
            {editing ? (
              <div className="grid gap-2 max-w-md">
                <Input value={draft.name} onChange={(e)=>setDraft({...draft, name: e.target.value})} placeholder="Full name" />
                <Input value={draft.email} onChange={(e)=>setDraft({...draft, email: e.target.value})} placeholder="Email" />
                <Input value={draft.location} onChange={(e)=>setDraft({...draft, location: e.target.value})} placeholder="Location" />
                <Textarea value={draft.bio} onChange={(e)=>setDraft({...draft, bio: e.target.value})} placeholder="Bio" rows={2} />
              </div>
            ) : (
              <>
                <h2 className="font-display text-3xl font-bold">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.bio} · {profile.xp.toLocaleString()} XP</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {profile.email}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {profile.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Joined {new Date(profile.joinedAt).toLocaleDateString(undefined,{month:"short",year:"numeric"})}</span>
                </div>
              </>
            )}
          </div>
          {editing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={()=>setEditing(false)}><X className="mr-1 h-4 w-4" /> Cancel</Button>
              <Button className="gradient-primary text-primary-foreground" onClick={save}><Save className="mr-1 h-4 w-4" /> Save</Button>
            </div>
          ) : (
            <Button className="gradient-primary text-primary-foreground" onClick={startEdit}><Edit3 className="mr-2 h-4 w-4" /> Edit profile</Button>
          )}
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
          <div className="mb-3 flex gap-2">
            <Input placeholder="Add a new goal…" value={newGoal} onChange={(e)=>setNewGoal(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&addGoal()} />
            <Button onClick={addGoal} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="grid gap-2">
            {goals.map((g) => (
              <div key={g.id} className="glass flex items-center gap-3 rounded-xl p-3">
                <input type="checkbox" checked={g.done} onChange={()=>toggleGoal(g.id)} className="h-4 w-4 accent-primary" />
                <span className={`flex-1 text-sm ${g.done ? "line-through text-muted-foreground" : ""}`}>{g.text}</span>
                <button onClick={()=>removeGoal(g.id)} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
              </div>
            ))}
            {goals.length === 0 && <p className="text-sm text-muted-foreground">No goals yet. Add one above.</p>}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
