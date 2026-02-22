import { useState, useEffect } from "react";

const SKILLS_DATA = [
  {
    id: "oop",
    category: "OOP with Java",
    icon: "☕",
    color: "#f59e0b",
    items: [
      { id: "oop-1", text: "Classes, objects, constructors, destructors" },
      { id: "oop-2", text: "Encapsulation — private/public/protected, getters/setters" },
      { id: "oop-3", text: "Inheritance — single, multilevel, hierarchical" },
      { id: "oop-4", text: "Polymorphism — method overloading & overriding" },
      { id: "oop-5", text: "Abstract classes and interfaces" },
      { id: "oop-6", text: "Exception handling — try/catch/finally, custom exceptions" },
      { id: "oop-7", text: "File I/O — reading/writing files in Java" },
      { id: "oop-8", text: "Collections framework — ArrayList, HashMap, LinkedList" },
      { id: "oop-9", text: "Mini Project 1 — Inheritance focused" },
      { id: "oop-10", text: "Mini Project 2 — Interfaces & Polymorphism focused" },
      { id: "oop-11", text: "Mini Project 3 — Exception Handling focused" },
      { id: "oop-12", text: "Mini Project 4 — File I/O & Collections focused" },
      { id: "oop-13", text: "Final Java Project — All concepts integrated" },
    ],
  },
  {
    id: "math",
    category: "Mathematics",
    icon: "∑",
    color: "#8b5cf6",
    items: [
      { id: "math-1", text: "Limits and continuity — intuition and formal definition" },
      { id: "math-2", text: "Derivatives — chain rule, product rule, quotient rule" },
      { id: "math-3", text: "Implicit differentiation" },
      { id: "math-4", text: "Maxima/minima — optimization problems" },
      { id: "math-5", text: "Integration techniques — substitution, by parts" },
      { id: "math-6", text: "Definite integrals and area under curve" },
      { id: "math-7", text: "Vectors — addition, dot product, cross product" },
      { id: "math-8", text: "Matrices — operations, transpose, inverse" },
      { id: "math-9", text: "Systems of linear equations — Gaussian elimination" },
      { id: "math-10", text: "3Blue1Brown Essence of Linear Algebra (all videos)" },
      { id: "math-11", text: "Connect derivatives to gradient descent conceptually" },
    ],
  },
  {
    id: "discrete",
    category: "Discrete Structures",
    icon: "◈",
    color: "#06b6d4",
    items: [
      { id: "disc-1", text: "Propositional logic — AND, OR, NOT, implication" },
      { id: "disc-2", text: "Predicate logic — quantifiers, logical equivalences" },
      { id: "disc-3", text: "Proof techniques — induction, contradiction, contraposition" },
      { id: "disc-4", text: "Set theory — unions, intersections, power sets" },
      { id: "disc-5", text: "Functions and relations — injective, surjective, bijective" },
      { id: "disc-6", text: "Combinatorics — permutations, combinations" },
      { id: "disc-7", text: "Graph theory basics — vertices, edges, paths, cycles" },
      { id: "disc-8", text: "Recurrence relations — basic solving" },
      { id: "disc-9", text: "Boolean algebra fundamentals" },
    ],
  },
  {
    id: "writing",
    category: "Expository Writing",
    icon: "✍",
    color: "#10b981",
    items: [
      { id: "write-1", text: "Thesis construction — clear, arguable, specific" },
      { id: "write-2", text: "Paragraph structure — topic sentence, evidence, analysis" },
      { id: "write-3", text: "Technical explanation writing — clarity over jargon" },
      { id: "write-4", text: "IEEE citation format — in-text and references" },
      { id: "write-5", text: "Abstract writing — summarize a paper in 150 words" },
      { id: "write-6", text: "Read 3 published CS papers end to end (any topic)" },
    ],
  },
  {
    id: "react",
    category: "React Mastery",
    icon: "⚛",
    color: "#38bdf8",
    items: [
      { id: "react-1", text: "Component architecture — presentational vs container" },
      { id: "react-2", text: "useState — all edge cases, functional updates" },
      { id: "react-3", text: "useEffect — dependencies, cleanup functions, pitfalls" },
      { id: "react-4", text: "useContext — Context API for global state" },
      { id: "react-5", text: "useRef, useMemo, useCallback — when and why" },
      { id: "react-6", text: "React Router v6 — nested routes, protected routes, params" },
      { id: "react-7", text: "Custom hooks — extracting reusable logic" },
      { id: "react-8", text: "API integration — async/await, loading/error states" },
      { id: "react-9", text: "Form handling — controlled components, validation" },
      { id: "react-10", text: "Performance optimization — memo, lazy, Suspense" },
      { id: "react-11", text: "Deploy a React app on Vercel" },
    ],
  },
  {
    id: "readlog",
    category: "ReadLog Project",
    icon: "📚",
    color: "#f97316",
    items: [
      { id: "rl-1", text: "Project setup — Vite, folder structure, routing configured" },
      { id: "rl-2", text: "Home page — featured books, recent additions" },
      { id: "rl-3", text: "Explore page — Open Library API search integrated" },
      { id: "rl-4", text: "Book detail page — full info from API" },
      { id: "rl-5", text: "Favorites — add/remove, persisted in backend" },
      { id: "rl-6", text: "My Lists — create, name, manage custom lists" },
      { id: "rl-7", text: "ReadLog page — track reading progress per book" },
      { id: "rl-8", text: "Manual CRUD — user can add/edit/delete books manually" },
      { id: "rl-9", text: "Node/Express backend — REST API with auth" },
      { id: "rl-10", text: "Database connected — user data persisted" },
      { id: "rl-11", text: "Deployed live on Vercel with proper README on GitHub" },
      { id: "rl-12", text: "Responsive — works on mobile and desktop" },
    ],
  },
  {
    id: "node",
    category: "Odin Project — Node.js",
    icon: "⬡",
    color: "#84cc16",
    items: [
      { id: "node-1", text: "Node.js basics — modules, require, npm" },
      { id: "node-2", text: "Express setup — routing, middleware, error handling" },
      { id: "node-3", text: "Template engines — EJS or Pug basics" },
      { id: "node-4", text: "MVC pattern — separating routes, controllers, models" },
      { id: "node-5", text: "MongoDB + Mongoose — schemas, models, CRUD" },
      { id: "node-6", text: "Authentication — sessions, passport.js, hashed passwords" },
      { id: "node-7", text: "RESTful API design — proper HTTP methods and status codes" },
      { id: "node-8", text: "Environment variables — dotenv, never commit secrets" },
      { id: "node-9", text: "Odin Mini Projects completed" },
      { id: "node-10", text: "Odin Final Project — started (completion in summer ok)" },
    ],
  },
  {
    id: "git",
    category: "Git & Professional Dev Habits",
    icon: "⎇",
    color: "#ef4444",
    items: [
      { id: "git-1", text: "Git fundamentals — init, add, commit, push, pull" },
      { id: "git-2", text: "Branching — feature branches, merge, rebase basics" },
      { id: "git-3", text: "GitHub — PRs, issues, README writing" },
      { id: "git-4", text: "Every project has a polished README with screenshots" },
      { id: "git-5", text: "Consistent commit messages — conventional commits format" },
      { id: "git-6", text: "GitHub profile — pinned repos, bio filled in, green squares" },
    ],
  },
  {
    id: "freelance",
    category: "Freelancing Foundation",
    icon: "💼",
    color: "#ec4899",
    items: [
      { id: "free-1", text: "Upwork profile created and fully filled" },
      { id: "free-2", text: "Fiverr gig created — HTML/CSS/React landing pages" },
      { id: "free-3", text: "Portfolio site live — shows ReadLog + other projects" },
      { id: "free-4", text: "Told 10 people in your network you take web dev work" },
      { id: "free-5", text: "First client outreach — 5 proposals sent on Upwork" },
      { id: "free-6", text: "First gig completed — any amount, any source" },
    ],
  },
  {
    id: "python",
    category: "Python Foundation (Early Start)",
    icon: "🐍",
    color: "#a3e635",
    items: [
      { id: "py-1", text: "Python syntax — variables, loops, functions, list comprehensions" },
      { id: "py-2", text: "OOP in Python — classes, inheritance (compare with Java)" },
      { id: "py-3", text: "NumPy — arrays, operations, broadcasting basics" },
      { id: "py-4", text: "Pandas — DataFrames, reading CSV, basic data manipulation" },
      { id: "py-5", text: "Matplotlib — basic plots, line, bar, scatter" },
      { id: "py-6", text: "One small data analysis project — any dataset from Kaggle" },
    ],
  },
];

const STORAGE_KEY = "sem2-checklist-v1";

export default function Checklist() {
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const isClaudeEnv = typeof window !== "undefined" && typeof window.storage !== "undefined";

  const loadData = async () => {
    try {
      if (isClaudeEnv) {
        const result = await window.storage.get(STORAGE_KEY);
        if (result && result.value) return JSON.parse(result.value);
      } else {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      }
    } catch {}
    return null;
  };

  const saveData = async (data) => {
    try {
      if (isClaudeEnv) {
        await window.storage.set(STORAGE_KEY, JSON.stringify(data));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch {}
  };

  useEffect(() => {
    const load = async () => {
      const parsed = await loadData();
      if (parsed) {
        setChecked(parsed.checked || {});
        setExpanded(parsed.expanded || {});
      }
      setLoaded(true);
    };
    load();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveData({ checked, expanded });
  }, [checked, expanded, loaded]);

  const toggleItem = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCategory = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getCategoryProgress = (items) => {
    const done = items.filter((i) => checked[i.id]).length;
    return { done, total: items.length, pct: Math.round((done / items.length) * 100) };
  };

  const totalItems = SKILLS_DATA.flatMap((c) => c.items).length;
  const totalDone = SKILLS_DATA.flatMap((c) => c.items).filter((i) => checked[i.id]).length;
  const overallPct = Math.round((totalDone / totalItems) * 100);

  const filtered = activeFilter === "all" ? SKILLS_DATA : SKILLS_DATA.filter((c) => c.id === activeFilter);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'Courier New', monospace",
      color: "#e2e8f0",
      padding: "0",
    }}>
      {/* Noise overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
        opacity: 0.4,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "40px 20px" }}>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#64748b", textTransform: "uppercase", marginBottom: "12px" }}>
            Semester 2 · Jan–June 2026
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: "800",
            letterSpacing: "-1px",
            lineHeight: 1.1,
            margin: "0 0 8px",
            fontFamily: "'Georgia', serif",
            background: "linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Skills Checklist
          </h1>
          <p style={{ color: "#475569", fontSize: "14px", margin: 0 }}>
            Coursework · Self-Learning · Projects · Career
          </p>
        </div>

        {/* Overall Progress */}
        <div style={{
          background: "#111118",
          border: "1px solid #1e293b",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "32px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: `${overallPct}%`, height: "3px",
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)",
            transition: "width 0.5s ease",
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "4px" }}>OVERALL PROGRESS</div>
              <div style={{ fontSize: "42px", fontWeight: "700", lineHeight: 1, fontFamily: "'Georgia', serif" }}>
                {overallPct}<span style={{ fontSize: "24px", color: "#64748b" }}>%</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "4px" }}>COMPLETED</div>
              <div style={{ fontSize: "32px", fontWeight: "700", lineHeight: 1 }}>
                <span style={{ color: "#6366f1" }}>{totalDone}</span>
                <span style={{ color: "#334155", fontSize: "20px" }}> / {totalItems}</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "4px" }}>REMAINING</div>
              <div style={{ fontSize: "32px", fontWeight: "700", lineHeight: 1, color: "#f59e0b" }}>
                {totalItems - totalDone}
              </div>
            </div>
          </div>

          {/* Mini grid of category progress */}
          <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px" }}>
            {SKILLS_DATA.map((cat) => {
              const { done, total, pct } = getCategoryProgress(cat.items);
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveFilter(activeFilter === cat.id ? "all" : cat.id)}
                  style={{
                    background: activeFilter === cat.id ? `${cat.color}18` : "#0d0d16",
                    border: `1px solid ${activeFilter === cat.id ? cat.color + "60" : "#1e293b"}`,
                    borderRadius: "10px",
                    padding: "10px 12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}>
                  <div style={{ fontSize: "16px", marginBottom: "4px" }}>{cat.icon}</div>
                  <div style={{ fontSize: "10px", color: "#64748b", letterSpacing: "0.5px", marginBottom: "6px", lineHeight: 1.3 }}>
                    {cat.category.toUpperCase()}
                  </div>
                  <div style={{ height: "3px", background: "#1e293b", borderRadius: "2px" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: cat.color, borderRadius: "2px", transition: "width 0.4s ease" }} />
                  </div>
                  <div style={{ fontSize: "11px", color: cat.color, marginTop: "4px" }}>{done}/{total}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter indicator */}
        {activeFilter !== "all" && (
          <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Filtering:</span>
            <span style={{
              fontSize: "12px", padding: "3px 10px", borderRadius: "20px",
              background: "#1e293b", color: "#e2e8f0", cursor: "pointer"
            }} onClick={() => setActiveFilter("all")}>
              {SKILLS_DATA.find(c => c.id === activeFilter)?.category} ✕
            </span>
          </div>
        )}

        {/* Categories */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((cat) => {
            const { done, total, pct } = getCategoryProgress(cat.items);
            const isOpen = expanded[cat.id] !== false; // default open

            return (
              <div key={cat.id} style={{
                background: "#0d0d16",
                border: `1px solid ${isOpen ? cat.color + "30" : "#1e293b"}`,
                borderRadius: "14px",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}>
                {/* Category Header */}
                <div
                  onClick={() => toggleCategory(cat.id)}
                  style={{
                    padding: "18px 22px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    background: isOpen ? `${cat.color}08` : "transparent",
                    transition: "background 0.2s",
                  }}>
                  <span style={{ fontSize: "22px", lineHeight: 1 }}>{cat.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "15px", fontWeight: "700", letterSpacing: "0.3px" }}>{cat.category}</span>
                      <span style={{
                        fontSize: "11px", padding: "2px 8px", borderRadius: "20px",
                        background: pct === 100 ? cat.color + "30" : "#1e293b",
                        color: pct === 100 ? cat.color : "#64748b",
                        letterSpacing: "0.5px",
                      }}>
                        {pct === 100 ? "✓ DONE" : `${done}/${total}`}
                      </span>
                    </div>
                    <div style={{ marginTop: "8px", height: "2px", background: "#1e293b", borderRadius: "2px", maxWidth: "200px" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: cat.color, borderRadius: "2px", transition: "width 0.4s ease" }} />
                    </div>
                  </div>
                  <span style={{ color: "#334155", fontSize: "18px", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>›</span>
                </div>

                {/* Items */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${cat.color}20` }}>
                    {cat.items.map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          padding: "12px 22px",
                          cursor: "pointer",
                          borderTop: idx > 0 ? "1px solid #0f172a" : "none",
                          background: checked[item.id] ? `${cat.color}06` : "transparent",
                          transition: "background 0.15s",
                        }}>
                        {/* Checkbox */}
                        <div style={{
                          width: "18px", height: "18px", borderRadius: "5px", flexShrink: 0,
                          border: checked[item.id] ? `2px solid ${cat.color}` : "2px solid #2d3748",
                          background: checked[item.id] ? cat.color : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.15s",
                        }}>
                          {checked[item.id] && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span style={{
                          fontSize: "13.5px",
                          color: checked[item.id] ? "#475569" : "#cbd5e1",
                          textDecoration: checked[item.id] ? "line-through" : "none",
                          lineHeight: 1.5,
                          transition: "all 0.15s",
                        }}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ marginTop: "48px", textAlign: "center", color: "#1e293b", fontSize: "12px", letterSpacing: "2px" }}>
          SEMESTER 2 · BSCS · 2026
        </div>
      </div>
    </div>
  );
}