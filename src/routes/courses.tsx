import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Star, PlayCircle, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useLocalStorage, K, toggleEnroll, bumpCourseProgress, type Enrollment } from "@/lib/store";

export const Route = createFileRoute("/courses")({ component: Courses });

const cats = ["All", "Programming", "Data Science", "Design", "Math", "Languages"];
const diffs = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const catalog = [
  { id: "c1", t: "Advanced Python Mastery", cat: "Programming", diff: "Advanced", rating: 4.9, students: 12400, instructor: "Dr. Lin Wei" },
  { id: "c2", t: "Machine Learning A-Z", cat: "Data Science", diff: "Intermediate", rating: 4.8, students: 34210, instructor: "Prof. Ana Ruiz" },
  { id: "c3", t: "System Design Fundamentals", cat: "Programming", diff: "Advanced", rating: 4.7, students: 8900, instructor: "Marcus Ford" },
  { id: "c4", t: "SQL for Analysts", cat: "Data Science", diff: "Beginner", rating: 4.9, students: 22100, instructor: "Priya Shah" },
  { id: "c5", t: "UI/UX Design Studio", cat: "Design", diff: "Intermediate", rating: 4.6, students: 5600, instructor: "Kenji Watanabe" },
  { id: "c6", t: "Linear Algebra for ML", cat: "Math", diff: "Intermediate", rating: 4.8, students: 9800, instructor: "Dr. Omar Bakr" },
  { id: "c7", t: "Spanish Conversation", cat: "Languages", diff: "Beginner", rating: 4.9, students: 18300, instructor: "Sofia Perez" },
  { id: "c8", t: "Deep Learning Pro", cat: "Data Science", diff: "Advanced", rating: 4.9, students: 15700, instructor: "Yuki Tanaka" },
];

function Courses() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [diff, setDiff] = useState("All Levels");
  const [enrollments] = useLocalStorage<Enrollment[]>(K.enrollments, []);
  const map = useMemo(() => Object.fromEntries(enrollments.map((e) => [e.courseId, e])), [enrollments]);

  const filtered = catalog.filter((c) =>
    (cat === "All" || c.cat === cat) &&
    (diff === "All Levels" || c.diff === diff) &&
    c.t.toLowerCase().includes(q.toLowerCase())
  );

  const onEnroll = (c: typeof catalog[number]) => {
    toggleEnroll(c.id);
    toast.success(map[c.id] ? `Unenrolled from ${c.t}` : `Enrolled in ${c.t}`);
  };
  const onResume = (c: typeof catalog[number]) => {
    bumpCourseProgress(c.id, 10);
    toast.success("+10% progress");
  };

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
        {filtered.map((c) => {
          const enr = map[c.id];
          const progress = enr?.progress ?? 0;
          return (
            <Card key={c.id} className="glass card-hover overflow-hidden p-0">
              <div className="relative h-32" style={{background:"var(--gradient-hero)"}}>
                <div className="absolute inset-0 grid place-items-center">
                  <PlayCircle className="h-10 w-10 text-white/90" />
                </div>
                <Badge className="absolute left-3 top-3 bg-black/40 text-white backdrop-blur">{c.diff}</Badge>
                {enr && <Badge className="absolute right-3 top-3 gradient-primary text-primary-foreground gap-1"><Check className="h-3 w-3" /> Enrolled</Badge>}
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
                {progress > 0 && <Progress value={progress} className="mt-3 h-1.5" />}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" onClick={()=>onEnroll(c)}>
                    {enr ? "Unenroll" : "Enroll"}
                  </Button>
                  <Button size="sm" onClick={()=>onResume(c)} className="gradient-primary text-primary-foreground">
                    {progress > 0 ? "Continue" : "Start"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
