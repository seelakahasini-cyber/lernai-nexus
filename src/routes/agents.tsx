import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Brain, CalendarDays, RefreshCcw, Code2, Compass, Heart, LineChart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/agents")({ component: Agents });

const agents = [
  { name: "Tutor Agent", desc: "Explains concepts with clear examples and analogies.", icon: GraduationCap, color: "from-indigo-500 to-purple-500" },
  { name: "Quiz Generator", desc: "Adaptive quizzes tuned to your current skill level.", icon: Brain, color: "from-purple-500 to-pink-500" },
  { name: "Study Planner", desc: "Builds personalized weekly schedules that fit your life.", icon: CalendarDays, color: "from-cyan-500 to-blue-500" },
  { name: "Revision Agent", desc: "Summaries, flashcards and spaced repetition on demand.", icon: RefreshCcw, color: "from-emerald-500 to-teal-500" },
  { name: "Coding Mentor", desc: "Debug, explain and level up your programming skills.", icon: Code2, color: "from-orange-500 to-red-500" },
  { name: "Career Guidance", desc: "Maps your skills to modern career paths and next moves.", icon: Compass, color: "from-fuchsia-500 to-indigo-500" },
  { name: "Motivation Coach", desc: "Streaks, encouragement and daily nudges to keep going.", icon: Heart, color: "from-rose-500 to-pink-600" },
  { name: "Performance Analyzer", desc: "Deep insights into how, where and why you learn best.", icon: LineChart, color: "from-yellow-500 to-orange-500" },
];

function Agents() {
  return (
    <AppShell title="AI Agent Hub" subtitle="Eight specialized agents, always ready to help you learn.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agents.map((a) => {
          const Icon = a.icon;
          return (
            <Card key={a.name} className="glass card-hover group flex flex-col p-6">
              <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${a.color} shadow-lg transition-transform group-hover:scale-110`}>
                <Icon className="h-7 w-7 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold">{a.name}</h3>
                <Badge variant="outline" className="gap-1 border-green-500/30 text-xs text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse-glow" /> Online
                </Badge>
              </div>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.desc}</p>
              <Button asChild size="sm" className="mt-4 gradient-primary text-primary-foreground">
                <Link to="/chat">Open Agent <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
              </Button>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
