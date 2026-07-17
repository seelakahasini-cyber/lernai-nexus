import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Star, PlayCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/courses")({ component: Courses });

const cats = ["All", "Programming", "Data Science", "Design", "Math", "Languages"];
const diffs = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const courses = [
  { t: "Advanced Python Mastery", cat: "Programming", diff: "Advanced", rating: 4.9, students: 12400, progress: 62, instructor: "Dr. Lin Wei" },
  { t: "Machine Learning A-Z", cat: "Data Science", diff: "Intermediate", rating: 4.8, students: 34210, progress: 81, instructor: "Prof. Ana Ruiz" },
  { t: "System Design Fundamentals", cat: "Programming", diff: "Advanced", rating: 4.7, students: 8900, progress: 34, instructor: "Marcus Ford" },
  { t: "SQL for Analysts", cat: "Data Science", diff: "Beginner", rating: 4.9, students: 22100, progress: 0, instructor: "Priya Shah" },
  { t: "UI/UX Design Studio", cat: "Design", diff: "Intermediate", rating: 4.6, students: 5600, progress: 22, instructor: "Kenji Watanabe" },
  { t: "Linear Algebra for ML", cat: "Math", diff: "Intermediate", rating: 4.8, students: 9800, progress: 0, instructor: "Dr. Omar Bakr" },
  { t: "Spanish Conversation", cat: "Languages", diff: "Beginner", rating: 4.9, students: 18300, progress: 45, instructor: "Sofia Perez" },
  { t: "Deep Learning Pro", cat: "Data Science", diff: "Advanced", rating: 4.9, students: 15700, progress: 0, instructor: "Yuki Tanaka" },
];

function Courses() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [diff, setDiff] = useState("All Levels");
  const filtered = courses.filter((c) =>
    (cat === "All" || c.cat === cat) &&
    (diff === "All Levels" || c.diff === diff) &&
    c.t.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <AppShell title="Course Library" subtitle="Curated learning tracks across every subject.">
      <Card className="glass p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search courses…" value={q} onChange={(e)=>setQ(e.target.value)} className="pl-9" />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={()=>setCat(c)} className={`rounded-full px-3 py-1.5 text-xs transition-colors ${cat===c?"gradient-primary text-primary-foreground":"glass hover:bg-white/5"}`}>{c}</button>
          ))}
          <div className="mx-2 h-6 w-px bg-border" />
          {diffs.map((d) => (
            <button key={d} onClick={()=>setDiff(d)} className={`rounded-full px-3 py-1.5 text-xs transition-colors ${diff===d?"gradient-primary text-primary-foreground":"glass hover:bg-white/5"}`}>{d}</button>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((c) => (
          <Card key={c.t} className="glass card-hover overflow-hidden p-0">
            <div className="relative h-32" style={{background:"var(--gradient-hero)"}}>
              <div className="absolute inset-0 grid place-items-center">
                <PlayCircle className="h-10 w-10 text-white/90" />
              </div>
              <Badge className="absolute left-3 top-3 bg-black/40 text-white backdrop-blur">{c.diff}</Badge>
            </div>
            <div className="p-5">
              <div className="mb-1 text-xs text-muted-foreground">{c.cat}</div>
              <h4 className="line-clamp-2 font-semibold">{c.t}</h4>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" /> {c.rating}</span>
                <span>{(c.students/1000).toFixed(1)}k students</span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <div className="grid h-6 w-6 place-items-center rounded-full gradient-primary text-[10px] font-bold text-white">{c.instructor.split(" ").map(w=>w[0]).slice(0,2).join("")}</div>
                <span className="text-muted-foreground">{c.instructor}</span>
              </div>
              {c.progress > 0 && <Progress value={c.progress} className="mt-3 h-1.5" />}
              <Button size="sm" className="mt-4 w-full gradient-primary text-primary-foreground">
                {c.progress > 0 ? "Continue Learning" : "Start Course"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
