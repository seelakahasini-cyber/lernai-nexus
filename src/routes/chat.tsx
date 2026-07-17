import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, Paperclip, Plus, Sparkles, Bot, User as UserIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/chat")({ component: Chat });

const history = [
  { title: "Explain recursion with examples", when: "2h ago" },
  { title: "Study plan for finals", when: "Yesterday" },
  { title: "Python decorators deep dive", when: "3 days ago" },
  { title: "Big-O for common structures", when: "Last week" },
];

const suggested = [
  "Give me a 20-min plan on gradient descent",
  "Quiz me on SQL joins",
  "Summarize Chapter 4 of my notes",
  "Career paths for a data science student",
];

type Msg = { role: "user" | "ai"; text: string };

function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hi Alex! I'm your **Tutor Agent**. What would you like to learn today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: "Great question! Here's a concise breakdown with an example you can follow along with…" }]);
      setTyping(false);
    }, 1400);
  };

  return (
    <AppShell>
      <div className="grid h-[calc(100vh-8rem)] gap-4 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <Card className="glass hidden flex-col p-4 lg:flex">
          <Button className="gradient-primary text-primary-foreground"><Plus className="mr-1 h-4 w-4" /> New chat</Button>
          <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">History</div>
          <div className="mt-2 flex-1 space-y-1 overflow-y-auto">
            {history.map((h) => (
              <button key={h.title} className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-white/5">
                <div className="truncate">{h.title}</div>
                <div className="text-xs text-muted-foreground">{h.when}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Main */}
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
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "ai" && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg gradient-primary"><Bot className="h-4 w-4 text-white" /></div>}
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "gradient-primary text-primary-foreground" : "glass"}`}>
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

          {msgs.length <= 1 && (
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
                placeholder="Ask anything… (Markdown & code blocks supported)" className="border-0 bg-transparent focus-visible:ring-0" />
              <Button variant="ghost" size="icon" className="shrink-0"><Mic className="h-4 w-4" /></Button>
              <Button size="icon" onClick={()=>send()} className="shrink-0 gradient-primary text-primary-foreground"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
