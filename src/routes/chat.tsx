import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, Paperclip, Plus, Sparkles, Bot, User as UserIcon, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage, K, type ChatThread, type ChatMessage } from "@/lib/store";

export const Route = createFileRoute("/chat")({ component: Chat });

const suggested = [
  "Give me a 20-min plan on gradient descent",
  "Quiz me on SQL joins",
  "Summarize Chapter 4 of my notes",
  "Career paths for a data science student",
];

const canned = (q: string) => {
  const s = q.toLowerCase();
  if (s.includes("plan")) return "Here's a focused plan:\n1. Warm-up (5m) — recall key terms\n2. Concept (10m) — walk through 2 examples\n3. Practice (5m) — 3 quick problems\nWant me to expand any step?";
  if (s.includes("quiz")) return "Great — I'll quiz you. First question: what does the SELECT clause return, and how does it differ from PROJECT in relational algebra?";
  if (s.includes("summar")) return "Summary: the chapter covers three ideas — (1) representation, (2) transformation, (3) evaluation — with examples in Python. Want the 60-second version or the deep dive?";
  if (s.includes("career") || s.includes("path")) return "Common paths: Data Analyst → Data Scientist → ML Engineer, or Research Scientist. Which sounds most interesting? I can map the next 3 skills for you.";
  return "Great question! Here's a concise breakdown you can follow, with a short example, and I'll adapt as we go. What would you like to focus on first?";
};

function relative(t: number) {
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const newThread = (): ChatThread => ({
  id: crypto.randomUUID(),
  title: "New chat",
  messages: [{ role: "ai", text: "Hi! I'm your Tutor Agent. What would you like to learn today?", at: Date.now() }],
  updatedAt: Date.now(),
});

function Chat() {
  const [threads, setThreads] = useLocalStorage<ChatThread[]>(K.chats, []);
  const [activeId, setActiveId] = useLocalStorage<string | null>(K.activeChat, null);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  // ensure at least one thread exists
  useEffect(() => {
    if (threads.length === 0) {
      const t = newThread();
      setThreads([t]);
      setActiveId(t.id);
    } else if (!activeId || !threads.some((t) => t.id === activeId)) {
      setActiveId(threads[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads.length]);

  const active = useMemo(() => threads.find((t) => t.id === activeId) ?? threads[0], [threads, activeId]);

  const updateActive = (updater: (t: ChatThread) => ChatThread) => {
    setThreads((list) => list.map((t) => (t.id === active?.id ? updater(t) : t)));
  };

  const send = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t || !active) return;
    const userMsg: ChatMessage = { role: "user", text: t, at: Date.now() };
    updateActive((th) => ({
      ...th,
      title: th.messages.length <= 1 ? t.slice(0, 40) : th.title,
      messages: [...th.messages, userMsg],
      updatedAt: Date.now(),
    }));
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const aiMsg: ChatMessage = { role: "ai", text: canned(t), at: Date.now() };
      updateActive((th) => ({ ...th, messages: [...th.messages, aiMsg], updatedAt: Date.now() }));
      setTyping(false);
    }, 900);
  };

  const startNew = () => {
    const t = newThread();
    setThreads((list) => [t, ...list]);
    setActiveId(t.id);
  };

  const removeThread = (id: string) => {
    setThreads((list) => list.filter((t) => t.id !== id));
    if (id === activeId) setActiveId(null);
  };

  if (!active) return null;

  return (
    <AppShell>
      <div className="grid h-[calc(100vh-8rem)] gap-4 lg:grid-cols-[280px_1fr]">
        <Card className="glass hidden flex-col p-4 lg:flex">
          <Button onClick={startNew} className="gradient-primary text-primary-foreground"><Plus className="mr-1 h-4 w-4" /> New chat</Button>
          <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">History</div>
          <div className="mt-2 flex-1 space-y-1 overflow-y-auto">
            {threads.map((h) => (
              <div key={h.id} className={`group flex items-center rounded-xl ${h.id === active.id ? "bg-white/5" : ""}`}>
                <button onClick={()=>setActiveId(h.id)} className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-white/5">
                  <div className="truncate">{h.title}</div>
                  <div className="text-xs text-muted-foreground">{relative(h.updatedAt)}</div>
                </button>
                <button onClick={()=>removeThread(h.id)} className="mr-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border/50 p-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary glow"><Bot className="h-5 w-5 text-white" /></div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold">Tutor Agent</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online • Ready to teach</div>
            </div>
            <Badge className="gradient-primary text-primary-foreground gap-1"><Sparkles className="h-3 w-3" /> Pro</Badge>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {active.messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "ai" && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg gradient-primary"><Bot className="h-4 w-4 text-white" /></div>}
                <div className={`max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "gradient-primary text-primary-foreground" : "glass"}`}>
                  {m.text}
                </div>
                {m.role === "user" && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary"><UserIcon className="h-4 w-4" /></div>}
              </div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary"><Bot className="h-4 w-4 text-white" /></div>
                <div className="glass rounded-2xl px-4 py-3">
                  <span className="inline-flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" style={{animationDelay:"0.2s"}} />
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" style={{animationDelay:"0.4s"}} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {active.messages.length <= 1 && (
            <div className="px-6 pb-2">
              <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Suggested</div>
              <div className="flex flex-wrap gap-2">
                {suggested.map((s) => (
                  <button key={s} onClick={()=>send(s)} className="glass rounded-full border-border/50 px-3 py-1.5 text-xs hover:border-primary/50 transition-colors">{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-border/50 p-4">
            <div className="glass flex items-center gap-2 rounded-2xl p-2">
              <Button variant="ghost" size="icon" className="shrink-0"><Paperclip className="h-4 w-4" /></Button>
              <Input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&send()}
                placeholder="Ask anything…" className="border-0 bg-transparent focus-visible:ring-0" />
              <Button variant="ghost" size="icon" className="shrink-0"><Mic className="h-4 w-4" /></Button>
              <Button size="icon" onClick={()=>send()} className="shrink-0 gradient-primary text-primary-foreground"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
