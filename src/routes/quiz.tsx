import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/quiz")({ component: Quiz });

const questions = [
  { q: "What is the time complexity of binary search on a sorted array?", opts: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correct: 1 },
  { q: "Which data structure uses LIFO ordering?", opts: ["Queue", "Stack", "Heap", "Tree"], correct: 1 },
  { q: "Which SQL clause filters aggregated results?", opts: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"], correct: 2 },
  { q: "What does JSX stand for in React?", opts: ["JavaScript XML", "Java Syntax Extension", "JSON Extra", "None"], correct: 0 },
  { q: "In ML, overfitting means:", opts: ["Model too simple", "Model memorizes training data", "Data too small", "None"], correct: 1 },
];

function Quiz() {
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [time, setTime] = useState(60);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setTime((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [done]);

  const submit = () => {
    if (selected === null) return;
    const next = [...answers, selected];
    setAnswers(next);
    setSelected(null);
    if (i < questions.length - 1) setI(i + 1);
    else setDone(true);
  };

  const score = answers.reduce((s, a, idx) => s + (a === questions[idx].correct ? 1 : 0), 0);

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <AppShell title="Quiz Complete!" subtitle="Here's how you did.">
        <Card className="glass mx-auto max-w-2xl p-10 text-center">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full gradient-hero glow">
            <Trophy className="h-12 w-12 text-white" />
          </div>
          <h2 className="mt-6 font-display text-5xl font-black gradient-text">{pct}%</h2>
          <p className="mt-1 text-muted-foreground">{score} out of {questions.length} correct</p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-left">
            <Card className="glass p-4"><div className="text-xs text-muted-foreground">Time</div><div className="font-display text-2xl font-bold">{60-time}s</div></Card>
            <Card className="glass p-4"><div className="text-xs text-muted-foreground">Accuracy</div><div className="font-display text-2xl font-bold">{pct}%</div></Card>
            <Card className="glass p-4"><div className="text-xs text-muted-foreground">XP earned</div><div className="font-display text-2xl font-bold">+{score*50}</div></Card>
          </div>
          <div className="mt-8 space-y-2 text-left">
            {questions.map((qq, idx) => (
              <div key={idx} className="glass flex items-center gap-3 rounded-xl p-3 text-sm">
                {answers[idx] === qq.correct ? <CheckCircle2 className="h-5 w-5 text-green-400" /> : <XCircle className="h-5 w-5 text-red-400" />}
                <span className="truncate">{qq.q}</span>
              </div>
            ))}
          </div>
          <Button onClick={()=>{setI(0);setAnswers([]);setDone(false);setTime(60);}} className="mt-8 gradient-primary text-primary-foreground">
            <RotateCcw className="mr-2 h-4 w-4" /> Try again
          </Button>
        </Card>
      </AppShell>
    );
  }

  const q = questions[i];
  return (
    <AppShell title="DSA Adaptive Quiz" subtitle="Answer 5 questions. Difficulty adapts as you go.">
      <Card className="glass mx-auto max-w-3xl p-8">
        <div className="mb-4 flex items-center justify-between">
          <Badge variant="outline">Question {i+1} of {questions.length}</Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" /> {time}s</div>
        </div>
        <Progress value={((i)/questions.length)*100} className="mb-6 h-1.5" />
        <h3 className="font-display text-2xl font-bold">{q.q}</h3>
        <div className="mt-6 space-y-3">
          {q.opts.map((o, idx) => (
            <button key={o} onClick={()=>setSelected(idx)}
              className={`w-full rounded-2xl border p-4 text-left transition-all ${
                selected === idx ? "border-primary bg-primary/10 glow" : "glass hover:border-primary/50"
              }`}>
              <span className="mr-3 inline-grid h-7 w-7 place-items-center rounded-lg bg-secondary text-xs font-bold">{String.fromCharCode(65+idx)}</span>
              {o}
            </button>
          ))}
        </div>
        <Button onClick={submit} disabled={selected===null} className="mt-6 w-full gradient-primary text-primary-foreground">
          {i === questions.length - 1 ? "Finish" : "Next question"}
        </Button>
      </Card>
    </AppShell>
  );
}
