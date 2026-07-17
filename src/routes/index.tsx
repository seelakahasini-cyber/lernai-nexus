import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Sparkles, Bot, GraduationCap, Target, Zap, Code2, Compass,
  Rocket, ArrowRight, Check, Star, Brain, MessageSquare, BookOpen
} from "lucide-react";
import { Navbar } from "@/components/edu/Navbar";
import heroImg from "@/assets/hero-ai.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduMind AI — Learn Smarter with Multi-Agent AI" },
      { name: "description", content: "Multi-agent AI platform for personalized learning. Tutors, quizzes, planners and career coaches." },
    ],
  }),
  component: Landing,
});

const stats = [
  { value: "120K+", label: "Students Learning" },
  { value: "8", label: "AI Agents" },
  { value: "540+", label: "Courses" },
  { value: "2.3M", label: "Learning Hours" },
];

const features = [
  { icon: Bot, title: "Multi-Agent Intelligence", desc: "Eight specialized AI agents collaborate to tutor, quiz, plan and guide you." },
  { icon: Target, title: "Personalized Roadmaps", desc: "Every learner gets a unique path built from real-time skill assessment." },
  { icon: Zap, title: "Adaptive Quizzes", desc: "Difficulty tunes to your level so you're always growing, never bored." },
  { icon: Code2, title: "Coding Mentor", desc: "Explain, debug and learn programming with an always-on senior dev." },
  { icon: Compass, title: "Career Guidance", desc: "AI matches your skills to modern career paths and next steps." },
  { icon: Rocket, title: "Motivation Coach", desc: "Streaks, XP and daily nudges to keep momentum going strong." },
];

const testimonials = [
  { name: "Priya S.", role: "CS Undergrad", quote: "EduMind's tutor agent explains DSA better than any YouTube playlist I've tried." },
  { name: "Marcus O.", role: "Bootcamp Grad", quote: "The coding mentor caught bugs my seniors missed. Absolutely game-changing." },
  { name: "Aisha R.", role: "High Schooler", quote: "I actually enjoy studying now. The streaks and quizzes make it feel like a game." },
];

const pricing = [
  { name: "Free", price: "$0", desc: "For curious learners", features: ["3 AI agents", "10 quizzes / mo", "Community support"], cta: "Start free" },
  { name: "Pro", price: "$12", desc: "Most popular", features: ["All 8 agents", "Unlimited quizzes", "Personalized roadmap", "Priority support"], cta: "Go Pro", highlight: true },
  { name: "Teams", price: "$29", desc: "Classrooms & cohorts", features: ["Everything in Pro", "Analytics dashboard", "Admin controls", "SSO"], cta: "Contact us" },
];

const faqs = [
  { q: "What is EduMind AI?", a: "A multi-agent AI learning platform where specialized agents tutor, quiz, plan and coach you." },
  { q: "Do I need any prior knowledge?", a: "No. The skill assessment agent builds a plan from wherever you are today." },
  { q: "Can I use it for coding?", a: "Yes — the Coding Mentor agent handles Python, JS, C++, SQL and more." },
  { q: "Is there a free plan?", a: "Yes. Start free forever, upgrade any time." },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 sm:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-fade-up space-y-6">
            <Badge className="glass gap-1.5 border-primary/30 px-3 py-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Powered by 8 Specialized AI Agents
            </Badge>
            <h1 className="font-display text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
              Learn Smarter <br />with <span className="gradient-text">Multi-Agent AI</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              EduMind AI orchestrates a team of intelligent agents that tutor, quiz, plan and mentor you — so every learner gets a truly personalized experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild className="gradient-primary text-primary-foreground hover:opacity-90 glow">
                <Link to="/register">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="glass border-border">
                <a href="#features">Explore Features</a>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {["#4F46E5","#7C3AED","#06B6D4","#a78bfa"].map((c,i)=>(
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background" style={{background:c}} />
                ))}
              </div>
              <span>Trusted by <b className="text-foreground">120,000+</b> students worldwide</span>
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="absolute inset-0 -z-10 animate-pulse-glow rounded-full blur-3xl" style={{background:"var(--gradient-glow)"}} />
            <img
              src={heroImg}
              alt="AI education visualization with neural network and graduation cap"
              width={1280} height={1024}
              className="animate-float rounded-3xl border border-border glass"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="glass grid grid-cols-2 gap-6 rounded-3xl p-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="gradient-text font-display text-3xl font-black sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">Features</Badge>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Everything you need to <span className="gradient-text">master any subject</span></h2>
          <p className="mt-4 text-muted-foreground">A complete AI-powered learning stack, thoughtfully designed.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} className="glass card-hover group border-border/50 p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary glow group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold">Loved by learners</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="glass card-hover p-6">
              <div className="mb-3 flex gap-0.5">{[...Array(5)].map((_,i)=><Star key={i} className="h-4 w-4 fill-accent text-accent" />)}</div>
              <p className="text-sm">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full gradient-hero text-xs font-bold text-white">{t.name[0]}</div>
                <div><div className="text-sm font-semibold">{t.name}</div><div className="text-xs text-muted-foreground">{t.role}</div></div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">Pricing</Badge>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Simple, transparent plans</h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pricing.map((p) => (
            <Card key={p.name} className={`glass card-hover relative p-8 ${p.highlight ? "border-primary glow" : ""}`}>
              {p.highlight && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-primary-foreground">Most popular</Badge>}
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 font-display text-5xl font-black">{p.price}<span className="text-base font-medium text-muted-foreground">/mo</span></div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent" /> {f}
                  </li>
                ))}
              </ul>
              <Button asChild className={`mt-6 w-full ${p.highlight ? "gradient-primary text-primary-foreground" : ""}`} variant={p.highlight ? "default" : "outline"}>
                <Link to="/register">{p.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold">Frequently asked questions</h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`} className="glass mb-3 rounded-2xl border-border/50 px-5">
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="glass relative overflow-hidden rounded-3xl p-12 text-center">
          <div className="absolute inset-0 -z-10 opacity-40" style={{background:"var(--gradient-hero)"}} />
          <h2 className="font-display text-4xl font-black text-white sm:text-5xl">Start learning smarter today</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">Join thousands of learners already growing with multi-agent AI.</p>
          <Button size="lg" asChild className="mt-6 bg-white text-primary hover:bg-white/90">
            <Link to="/register">Create free account <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary"><Brain className="h-5 w-5 text-white" /></div>
              <span className="font-display font-bold">EduMind<span className="gradient-text">AI</span></span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Learn smarter with multi-agent AI.</p>
          </div>
          {[
            { title: "Product", links: [["Features","/#features"],["Pricing","/#"],["Agents","/agents"]] },
            { title: "Company", links: [["About","/#"],["Blog","/#"],["Careers","/#"]] },
            { title: "Legal", links: [["Privacy","/#"],["Terms","/#"],["Contact","/#"]] },
          ].map((c) => (
            <div key={c.title}>
              <div className="mb-3 text-sm font-semibold">{c.title}</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {c.links.map(([l,h])=>(<li key={l}><a href={h} className="hover:text-foreground">{l}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-border/50 px-6 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} EduMind AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
