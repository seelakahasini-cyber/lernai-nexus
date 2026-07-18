/**
 * EduMind AI — Local Storage Store
 * ---------------------------------
 * All app functionality is backed by browser localStorage (no backend).
 * This file exposes:
 *   - low-level get/set helpers (SSR-safe)
 *   - a `useLocalStorage<T>` React hook with cross-tab sync
 *   - domain helpers/hooks: auth, profile, settings, courses, quiz,
 *     chat, learn (goals/skills), tasks
 */
import { useCallback, useEffect, useState } from "react";

// ---------- SSR-safe primitives ----------
const isBrowser = () => typeof window !== "undefined";

export function lsGet<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function lsSet<T>(key: string, value: T) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    // notify same-tab listeners (storage event only fires cross-tab)
    window.dispatchEvent(new CustomEvent("edu:ls", { detail: { key } }));
  } catch {
    /* quota exceeded — ignore */
  }
}

export function lsRemove(key: string) {
  if (!isBrowser()) return;
  window.localStorage.removeItem(key);
  window.dispatchEvent(new CustomEvent("edu:ls", { detail: { key } }));
}

// ---------- React hook ----------
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  // hydrate after mount to avoid SSR mismatch
  useEffect(() => {
    setValue(lsGet<T>(key, initial));
    setHydrated(true);
    const onChange = (e: Event) => {
      const ce = e as CustomEvent<{ key: string }>;
      if (ce.detail?.key === key || (e as StorageEvent).key === key) {
        setValue(lsGet<T>(key, initial));
      }
    };
    window.addEventListener("edu:ls", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("edu:ls", onChange);
      window.removeEventListener("storage", onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        lsSet(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  return [value, update, hydrated] as const;
}

// ---------- Keys ----------
export const K = {
  auth: "edu.auth",
  users: "edu.users",
  profile: "edu.profile",
  settings: "edu.settings",
  enrollments: "edu.enrollments",
  quizAttempts: "edu.quiz.attempts",
  chats: "edu.chats",
  activeChat: "edu.chats.active",
  goals: "edu.goals",
  skills: "edu.skills",
  tasks: "edu.tasks",
  studyLog: "edu.studyLog",
} as const;

// ---------- Types ----------
export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // demo only — plain, never send anywhere
  createdAt: number;
};

export type Session = { userId: string; email: string; name: string } | null;

export type Profile = {
  name: string;
  email: string;
  bio: string;
  location: string;
  avatarInitials: string;
  xp: number;
  joinedAt: number;
};

export type AppSettings = {
  dark: boolean;
  notifications: {
    dailyReminders: boolean;
    streakAlerts: boolean;
    recommendations: boolean;
    marketing: boolean;
  };
  language: string;
  timezone: string;
  twoFactor: boolean;
};

export type Enrollment = { courseId: string; progress: number; enrolledAt: number };

export type QuizAttempt = {
  id: string;
  topic: string;
  score: number;
  total: number;
  timeSeconds: number;
  xpEarned: number;
  at: number;
};

export type ChatMessage = { role: "user" | "ai"; text: string; at: number };
export type ChatThread = { id: string; title: string; messages: ChatMessage[]; updatedAt: number };

export type Goal = { id: string; text: string; done: boolean };
export type Skill = { name: string; level: number };
export type Task = { id: string; title: string; due: string; tag: string; done: boolean };

// ---------- Defaults / seeds ----------
export const defaultProfile = (name = "Alex Kumar", email = "alex@edumind.ai"): Profile => ({
  name,
  email,
  bio: "Lifelong learner powered by AI.",
  location: "Bengaluru, India",
  avatarInitials: name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase(),
  xp: 0,
  joinedAt: Date.now(),
});

export const defaultSettings: AppSettings = {
  dark: true,
  notifications: {
    dailyReminders: true,
    streakAlerts: true,
    recommendations: false,
    marketing: false,
  },
  language: "en",
  timezone: "ist",
  twoFactor: false,
};

export const defaultGoals: Goal[] = [
  { id: "g1", text: "Solve 200 DSA problems this quarter", done: false },
  { id: "g2", text: "Complete ML specialization", done: false },
  { id: "g3", text: "Ship 2 portfolio projects", done: false },
];

export const defaultSkills: Skill[] = [
  { name: "Data Structures", level: 40 },
  { name: "Algorithms", level: 35 },
  { name: "System Design", level: 20 },
  { name: "SQL & Databases", level: 55 },
  { name: "Machine Learning", level: 30 },
];

export const defaultTasks: Task[] = [
  { id: "t1", title: "Complete SQL quiz", due: "Today", tag: "Quiz", done: false },
  { id: "t2", title: "Watch: Neural Nets pt.3", due: "Tomorrow", tag: "Video", done: false },
  { id: "t3", title: "Practice Recursion set", due: "Fri", tag: "Practice", done: false },
];

// ---------- Auth ----------
export function signUp(name: string, email: string, password: string): { ok: true } | { ok: false; error: string } {
  const users = lsGet<User[]>(K.users, []);
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
    return { ok: false, error: "An account with this email already exists." };
  const user: User = { id: crypto.randomUUID(), name, email, password, createdAt: Date.now() };
  lsSet(K.users, [...users, user]);
  lsSet<Session>(K.auth, { userId: user.id, email: user.email, name: user.name });
  lsSet<Profile>(K.profile, defaultProfile(name, email));
  return { ok: true };
}

export function signIn(email: string, password: string): { ok: true } | { ok: false; error: string } {
  const users = lsGet<User[]>(K.users, []);
  let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  // demo convenience: if no user exists yet, provision one on the fly
  if (!user && email && password) {
    const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    user = { id: crypto.randomUUID(), name, email, password, createdAt: Date.now() };
    lsSet(K.users, [...users, user]);
    lsSet<Profile>(K.profile, defaultProfile(name, email));
  }
  if (!user) return { ok: false, error: "No account found." };
  if (user.password !== password) return { ok: false, error: "Incorrect password." };
  lsSet<Session>(K.auth, { userId: user.id, email: user.email, name: user.name });
  return { ok: true };
}

export function signOut() {
  lsRemove(K.auth);
}

export function getSession(): Session {
  return lsGet<Session>(K.auth, null);
}

// ---------- Courses ----------
export function toggleEnroll(courseId: string) {
  const list = lsGet<Enrollment[]>(K.enrollments, []);
  const existing = list.find((e) => e.courseId === courseId);
  if (existing) {
    lsSet(K.enrollments, list.filter((e) => e.courseId !== courseId));
  } else {
    lsSet(K.enrollments, [...list, { courseId, progress: 0, enrolledAt: Date.now() }]);
  }
}

export function bumpCourseProgress(courseId: string, delta = 10) {
  const list = lsGet<Enrollment[]>(K.enrollments, []);
  const existing = list.find((e) => e.courseId === courseId);
  const next = existing
    ? list.map((e) =>
        e.courseId === courseId ? { ...e, progress: Math.min(100, e.progress + delta) } : e,
      )
    : [...list, { courseId, progress: Math.min(100, delta), enrolledAt: Date.now() }];
  lsSet(K.enrollments, next);
}

// ---------- Quiz ----------
export function saveQuizAttempt(a: Omit<QuizAttempt, "id" | "at">) {
  const list = lsGet<QuizAttempt[]>(K.quizAttempts, []);
  const attempt: QuizAttempt = { ...a, id: crypto.randomUUID(), at: Date.now() };
  lsSet(K.quizAttempts, [attempt, ...list]);
  // award XP to profile
  const p = lsGet<Profile>(K.profile, defaultProfile());
  lsSet<Profile>(K.profile, { ...p, xp: p.xp + a.xpEarned });
  logStudyMinutes(Math.max(1, Math.round(a.timeSeconds / 60)));
  return attempt;
}

// ---------- Study log (simple per-day minutes) ----------
export function logStudyMinutes(minutes: number) {
  const day = new Date().toISOString().slice(0, 10);
  const log = lsGet<Record<string, number>>(K.studyLog, {});
  log[day] = (log[day] ?? 0) + minutes;
  lsSet(K.studyLog, log);
}

export function getStreak(): number {
  const log = lsGet<Record<string, number>>(K.studyLog, {});
  let streak = 0;
  const d = new Date();
  while (true) {
    const key = d.toISOString().slice(0, 10);
    if ((log[key] ?? 0) > 0) {
      streak += 1;
      d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
}
