# Portfolio Architecture — Nushant Ghimire

**Status:** Living document
**Owner:** Nushant Ghimire
**Last updated:** 2026-08-23

## Guiding Principle

Ship a fast, polished, chat-first portfolio in Phase 1 with the smallest architecture that works. Add complexity only when a real constraint forces it (more content, more traffic, more features) — not preemptively. Every phase below is additive; nothing in Phase 1 needs to be rewritten to reach Phase 2 or 3.

---

## Phase 1 — Ship This

### 1.1 Objective

A single Next.js app, one deployment target, no separate backend, no vector database, no admin dashboard. The entire "AI knows about me" system is: knowledge base files → injected into an LLM system prompt → streamed response. Content updates happen by editing files and pushing to git.

### 1.2 Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Single deploy target, API routes double as backend |
| Language | TypeScript | Type safety across UI + API |
| Styling | Tailwind CSS | Fast iteration, small bundle |
| Components | shadcn/ui | Accessible primitives, no heavy design system |
| Animation | Framer Motion (hero only, minimal use) | Scoped down from Phase 1 spec — one hero sequence, not five |
| LLM | Claude API (Anthropic SDK) or OpenAI SDK — pick one, don't abstract both yet | Streaming support, tool use support |
| Hosting | Vercel | Zero-config Next.js hosting, edge functions, free tier sufficient |
| Content | Markdown/JSON files in repo | No database needed at this scale |

Explicitly **not** in Phase 1: FastAPI, ChromaDB/Pinecone/Supabase Vector, JWT auth, admin dashboard, Railway/Render.

### 1.3 Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, metadata
│   ├── page.tsx                    # Home — hero + About + Projects + Contact sections
│   ├── globals.css
│   └── api/
│       └── chat/
│           └── route.ts            # POST endpoint — streams LLM response
├── components/
│   ├── hero/
│   │   ├── Hero.tsx                 # Single polished hero animation
│   │   └── HeroBackground.tsx       # Optional lightweight canvas/CSS effect
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   └── Contact.tsx
│   ├── chat/
│   │   ├── ChatWidget.tsx           # Floating chat button + panel
│   │   ├── ChatMessage.tsx          # Renders markdown/code in responses
│   │   ├── ChatInput.tsx
│   │   └── SuggestedPrompts.tsx     # "What projects has he built?" etc.
│   ├── nav/
│   │   └── Navbar.tsx
│   ├── footer/
│   │   └── Footer.tsx
│   └── ui/                          # shadcn components
├── lib/
│   ├── knowledge-base.ts            # Loads + assembles all data/ files into one context string
│   ├── system-prompt.ts             # Builds the full system prompt sent to the LLM
│   ├── tools.ts                     # Navigation tool-call definitions + handlers
│   └── anthropic.ts                 # Thin wrapper around the Anthropic/OpenAI SDK client
├── data/
│   ├── resume.pdf
│   ├── about.md
│   ├── experience.md
│   ├── skills.md
│   ├── education.md
│   ├── certifications.md
│   ├── projects/
│   │   ├── matchhire.md
│   │   ├── swastha.md
│   │   └── trading-system.md
│   └── socials.json
├── public/
│   ├── resume.pdf
│   └── images/
├── next.config.js
├── tailwind.config.ts
├── package.json
└── architecture.md                  # this file
```

### 1.4 Data Flow

```
Visitor opens site
      │
      ▼
Next.js renders static sections (About / Projects / Contact) — server components, no client JS needed for content
      │
      ▼
Visitor opens Chat Widget and asks a question
      │
      ▼
POST /api/chat  { message, history }
      │
      ▼
route.ts:
  1. Load knowledge base (lib/knowledge-base.ts) — reads data/*.md + projects/*.md once, cached in memory
  2. Build system prompt (lib/system-prompt.ts) — injects full knowledge base + tool definitions
  3. Call LLM with streaming enabled, passing conversation history + system prompt
  4. If LLM emits a tool_use block (e.g. "open_github"), stream a small structured event the client interprets as an action
      │
      ▼
Client (ChatWidget) reads the stream:
  - Text tokens → typing animation into ChatMessage
  - Tool-call event → perform navigation action (scroll, open link, trigger download)
```

### 1.5 Knowledge Base Strategy (No Vector DB)

Because the entire knowledge base is a few thousand words, it is loaded in full into the system prompt on every request. No embeddings, no retrieval step, no "relevant chunk" guessing.

`lib/knowledge-base.ts`:
```ts
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export function loadKnowledgeBase(): string {
  const files = [
    "about.md",
    "experience.md",
    "skills.md",
    "education.md",
    "certifications.md",
    "projects/matchhire.md",
    "projects/swastha.md",
    "projects/trading-system.md",
  ];

  return files
    .map((f) => {
      const content = fs.readFileSync(path.join(DATA_DIR, f), "utf-8");
      return `--- ${f} ---\n${content}`;
    })
    .join("\n\n");
}
```

This runs at request time on the server (or is cached at build/startup — see Performance section). Total size stays well under typical LLM context limits (Phase 1 content is nowhere close to the ~150k+ token range where this would matter).

### 1.6 System Prompt Design

`lib/system-prompt.ts` assembles:
1. **Persona instruction** — "You are an AI assistant on Nushant Ghimire's portfolio. Answer only using the knowledge base below. Never invent facts. If asked something outside scope, say so and offer to help find related info."
2. **Full knowledge base** — the string from `loadKnowledgeBase()`.
3. **Tool definitions** — a fixed list of navigation actions the model may call (Section 1.7).
4. **Formatting rules** — respond in Markdown, use short paragraphs, code fences for anything technical.

This is a single static template with the knowledge base spliced in — no dynamic retrieval logic required.

### 1.7 Tool Calling — Navigation Only

Phase 1 tools are deliberately narrow: they move the visitor around the page or trigger simple browser actions. They are **not** used for answering questions (that's plain text generation from the knowledge base).

| Tool name | Trigger example | Action |
|---|---|---|
| `scroll_to_section` | "Show me his projects" | Smooth-scrolls to `#projects` |
| `open_github` | "Open his GitHub" | `window.open(githubUrl)` |
| `open_linkedin` | "Show LinkedIn" | `window.open(linkedinUrl)` |
| `download_resume` | "Download his resume" | Triggers `/resume.pdf` download |
| `open_contact` | "Contact Nushant" | Scrolls to contact form / focuses input |

Tool schema example (Anthropic SDK tool-use format):
```ts
export const navigationTools = [
  {
    name: "scroll_to_section",
    description: "Scroll the page to a named section",
    input_schema: {
      type: "object",
      properties: {
        section: { type: "string", enum: ["about", "projects", "contact"] },
      },
      required: ["section"],
    },
  },
  {
    name: "download_resume",
    description: "Trigger a download of the resume PDF",
    input_schema: { type: "object", properties: {} },
  },
  // open_github, open_linkedin, open_contact follow the same pattern
];
```

The API route passes `tools: navigationTools` to the LLM call. When the model returns a `tool_use` block instead of (or alongside) text, the route streams a small JSON event (e.g. `{ type: "action", tool: "scroll_to_section", input: { section: "projects" } }`) that the client-side `ChatWidget` listens for and executes. This avoids a second round trip — one streamed response can contain both narration and the action.

**Note on cost/latency:** since these are simple intent-to-action mappings, a lightweight keyword match (e.g. "github" in the message) is a viable cheaper alternative to a full tool-calling round trip if latency becomes a concern later. Worth benchmarking once real usage exists — not a Phase 1 blocker either way.

### 1.8 Streaming Implementation

`app/api/chat/route.ts` uses the Edge or Node runtime with a `ReadableStream` response:

```ts
export const runtime = "edge"; // or "nodejs" if using fs-based knowledge base loading

export async function POST(req: Request) {
  const { message, history } = await req.json();
  const systemPrompt = buildSystemPrompt();

  const stream = await anthropic.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [...history, { role: "user", content: message }],
    tools: navigationTools,
  });

  return new Response(stream.toReadableStream(), {
    headers: { "Content-Type": "text/event-stream" },
  });
}
```

Client consumes this with the SDK's stream helpers or a basic `ReadableStream` reader, appending tokens to the visible message and watching for tool-use events.

> Note: if `fs.readFileSync` is used for the knowledge base, use the **Node.js runtime**, not Edge — Edge functions don't have filesystem access. Alternative: inline the knowledge base as a bundled TS/JSON constant at build time so it works on Edge too.

### 1.9 Conversation Memory (Phase 1 scope)

Phase 1 keeps memory **client-side only**, for the current session:
- `ChatWidget` holds a `history: {role, content}[]` array in React state.
- Sent with each request so the model has context of the ongoing conversation.
- Not persisted to a database — refresh clears it. Full persistent memory across sessions is a Phase 2+ concern.

### 1.10 Sections (Static Content)

- **Hero** — one entrance animation (fade/slide + name + role text), Framer Motion, kept under ~1–2s duration. No particle systems or 3D backgrounds in Phase 1.
- **About** — server component, reads from `data/about.md`, rendered via a markdown-to-JSX renderer (e.g. `react-markdown`).
- **Projects** — server component, one `ProjectCard` per file in `data/projects/`. Cards link to GitHub + optional live demo.
- **Contact** — simple form (mailto: link or a minimal serverless form handler) + social links from `data/socials.json`.
- **Navbar/Footer** — static, matches the nav structure already planned (Home, About, Projects, Contact; Resume link; social icons).

### 1.11 Performance & UX Targets

- Server components for all static content — zero client JS for About/Projects/Contact beyond hydration needs.
- `next/image` for any screenshots/media.
- Code-split the chat widget (`dynamic(() => import(...), { ssr: false })`) so it doesn't block initial paint.
- Target Lighthouse 90+ on Performance and Accessibility.
- Hero animation respects `prefers-reduced-motion`.

### 1.12 Deployment

- **Single target: Vercel.** Push to `main` → auto-deploy. No separate backend service, no environment split between frontend/backend hosts.
- Environment variables: `ANTHROPIC_API_KEY` (or `OPENAI_API_KEY`) stored in Vercel project settings, never exposed client-side.

### 1.13 Explicit Non-Goals for Phase 1

To keep scope honest, these are **deferred**, not forgotten:
- Admin dashboard / CRUD UI — update content via editing files + git push instead.
- JWT auth / role-based access — nothing in Phase 1 needs a login.
- Vector database / embeddings — knowledge base fits entirely in context.
- FastAPI or any second backend service.
- Blog system.
- Voice, 3D avatars, live coding demos, multi-language support.

---

## Phase 2 — If It Grows

Trigger for starting Phase 2: Phase 1 is live, stable, and you want more content depth or a better content-editing workflow than raw file edits.

### 2.1 Blog System (MDX)

- `content/blog/*.mdx` files, parsed with `next-mdx-remote` or Contentlayer.
- Each post: frontmatter (title, date, tags, reading time, summary).
- Blog index page with tag filtering and basic search (client-side fuzzy search over frontmatter — e.g. Fuse.js — no need for a search service yet).
- Syntax highlighting via `rehype-pretty-code` or `shiki`.
- Knowledge base loader extended to optionally include blog summaries so the chat assistant can reference posts ("Has he written about RAG?").

### 2.2 Richer Animation

- Expand Framer Motion usage: scroll-triggered reveals on section entry (`whileInView`), staggered project card entrances.
- Introduce GSAP + Lenis **only if** Framer Motion hits a real limitation (e.g. complex scroll-linked timelines) — don't add a second animation library speculatively.
- Still bounded by the same restraint principle: enhance, don't distract. Every added animation should be reviewed against Lighthouse performance impact.

### 2.3 Conversation Memory (Persistent)

- Move from client-only session memory to persisted history:
  - Lightweight option: `localStorage` per-browser persistence (no backend change).
  - Fuller option: a small Postgres/Supabase table keyed by an anonymous session ID, if you want cross-device memory or analytics on chat usage.
- Summarize older turns if conversations get long, to control token usage (simple truncation or a summarization pass — still no vector DB needed).

### 2.4 Minor Admin Convenience (optional, still not a full dashboard)

- If file-editing workflow becomes annoying: a single password-gated `/edit` route (basic auth, not full JWT/role system) for quick text edits to About/Skills, backed by a simple API route that writes to the repo via the GitHub API (commit-on-save). This avoids building a full CRUD dashboard while still giving a UI for quick edits.

---

## Phase 3 — Only If Content Outgrows Context

**Trigger condition (be strict about this):** the knowledge base — resume + experience + skills + all project write-ups + blog archive — approaches or exceeds a size where stuffing it fully into the system prompt on every request becomes slow, expensive, or starts truncating. This is a measurable signal (token count), not a vibe — check it before building anything in this phase.

### 3.1 Real RAG Pipeline

```
Knowledge Base Files → Chunking → Embedding Model → Vector Store → Similarity Search → Top-k Chunks → Prompt Construction → LLM → Streaming Response
```

- **Chunking:** split by section/heading rather than fixed-length windows, to keep semantic units intact (a whole project write-up, a whole blog post section).
- **Embeddings:** Sentence Transformers (self-hosted) or the embedding endpoint of whichever LLM provider you're using — avoid adding a second vendor unless there's a clear reason.
- **Vector store:** start with the simplest option that removes the need for a separate backend if possible — e.g. Supabase's pgvector (you may already have Postgres from Phase 2 memory/blog features) before reaching for a dedicated service like Pinecone or ChromaDB. Reuse infrastructure over adding new services.
- **Retrieval:** top-k (e.g. k=4–6) chunks by cosine similarity, inserted into the prompt in place of the full knowledge base dump.
- **Re-embedding workflow:** a script (not necessarily a UI) that runs on content changes — e.g. a GitHub Action triggered on push to `data/` or `content/blog/`, which re-chunks and re-embeds only changed files.

### 3.2 When to Introduce a Separate Backend

If retrieval logic, embedding jobs, or model orchestration outgrow what's comfortable in Next.js API routes, that's the point to introduce a dedicated FastAPI service (as in the original spec) — deployed separately (Railway/Render), with the Next.js app calling it instead of the LLM directly. This is deferred until Phase 3 because Phase 1–2 genuinely don't need it.

### 3.3 Admin Dashboard (Full Version)

Only at this scale does a full CRUD admin dashboard with JWT auth, role-based access, and "rebuild embeddings" controls earn its complexity — because by Phase 3 there's a real vector index that needs managing, not just markdown files that git handles fine.

---

## Summary Table

| Concern | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|
| Backend | Next.js API routes only | Same | Optional dedicated FastAPI service |
| Knowledge storage | Flat files, full-context injection | + MDX blog files | Chunked + embedded in vector store |
| Retrieval | None (full context) | None (full context, larger) | Similarity search (RAG) |
| Memory | Client session only | Persistent (localStorage/DB) | Persistent + summarized |
| Auth | None | Optional basic-auth edit route | Full JWT + roles |
| Content editing | Git push | Optional lightweight edit UI | Full admin dashboard |
| Animation | One hero sequence | Scroll-triggered reveals | Same, refined |
| Hosting | Vercel only | Vercel (+ maybe Supabase) | Vercel + Railway/Render + vector DB |

---

## Immediate Next Steps

1. Scaffold the Next.js project with the folder structure in §1.3.
2. Write `data/about.md`, `experience.md`, `skills.md`, and the three project files — this content is the actual bottleneck, not the code.
3. Build the static sections first (About/Projects/Contact) and confirm Lighthouse scores before adding the chat widget.
4. Wire up `/api/chat` with a hardcoded test knowledge base to validate streaming + tool calling before finalizing all content.
5. Only then layer in the hero animation — it's the highest-risk, lowest-functional-value piece, so build it last.