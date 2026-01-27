# 🐼 Panda – Next.js + PostgreSQL SaaS Starter
## Enterprise AI-Safe Full-Stack Template

This repository is an **enterprise-grade, full-stack SaaS starter** built with **Next.js (App Router)**, **PostgreSQL**, and **Prisma**.

It is explicitly designed for:

- **AI-assisted development**
- **Long-lived production systems**
- **Strict data & authentication safety**
- **Predictable, reviewable diffs**
- **Enterprise-scale collaboration**

This file is the **single authoritative operating manual** for:

- Human developers
- AI coding agents
- Automated fixing systems
- Code review & CI tooling

---

## 🚨 ABSOLUTE AUTHORITY NOTICE

This repository is governed by the **Panda Template Manifest**.

If anything conflicts:

1. Panda Template Manifest rules win
2. This README wins over inline comments
3. Explicit user instructions win over defaults
4. Assumptions are forbidden

If unclear → **STOP AND ASK**

---

## 🚀 TECHNOLOGY STACK

- **Frontend:** Next.js (App Router)
- **Backend:** Node.js (Route Handlers + Server Actions)
- **Database:** PostgreSQL (hosted on Railway)
- **ORM:** Prisma
- **Authentication:** NextAuth / Custom Auth
- **Language:** TypeScript (strict)
- **Deployment:** Vercel or Docker
- **Automation:** Custom Node.js scripts

---

## 🧠 SYSTEM PHILOSOPHY

### Core Principles

- Stability > Cleverness
- Data safety > UI speed
- Explicit > Implicit
- Minimal diffs > rewrites
- Contracts > convenience

### AI Design Doctrine

- AI behaves like a senior production engineer
- No speculative improvements
- No architectural drift
- No silent schema, auth, or infrastructure changes

---

## 📁 PROJECT STRUCTURE (SOURCE OF TRUTH)

```txt
/
├── app/                         # Next.js App Router (PRIMARY)
│   ├── layout.tsx               # Root layout (RESTRICTED)
│   ├── page.tsx                 # Public / marketing entry
│   ├── (dashboard)/             # Auth-protected SaaS surface (PRIMARY)
│   │   ├── page.tsx             # Main dashboard landing (REQUIRED)
│   │   ├── layout.tsx           # Dashboard shell (RESTRICTED)
│   │   ├── activity/            # SaaS feature area
│   │   └── general/             # SaaS feature area
│   ├── api/                     # Backend route handlers
│   └── actions/                 # Server actions
│
├── components/                  # Reusable UI components
│   ├── ui/                      # Design system primitives (RESTRICTED)
│   └── forms/                   # Controlled forms
│
├── lib/                         # Core application logic
│   ├── db.ts                    # Prisma client (READ-ONLY)
│   ├── auth.ts                  # Auth logic (RESTRICTED)
│   └── validators.ts            # Zod / validation schemas
│
├── prisma/
│   ├── schema.prisma            # Database schema (CRITICAL)
│   └── migrations/              # Auto-generated (NEVER EDIT)
│
├── scripts/                     # Automation & infrastructure logic
│   ├── db-init.js               # Database bootstrap (IMMUTABLE)
│   ├── dev-supervisor.js        # Dev orchestration (IMMUTABLE)
│   └── git-poll.js              # Repo polling (IMMUTABLE)
│
├── public/                      # Static assets
├── styles/                      # Global styles
│
├── env.example                  # Environment variable contract
├── Dockerfile                   # Container build definition (RESTRICTED)
├── next.config.js               # Framework config (RESTRICTED)
└── package.json                 # Dependency graph (RESTRICTED)
```


## 🧭 LANDING PAGES & DASHBOARD RULES (CRITICAL)

### Landing Pages

- **All landing page creation and updates MUST be done in:**

```
app/(dashboard)/page.tsx
```

- This file is the **single source of truth** for Panda’s SaaS landing experience
- No additional landing pages may be created unless explicitly requested
- Marketing and SaaS entry logic must converge here

---

### Dashboard & SaaS Feature Placement

All **SaaS-related features** must live inside:

```
app/(dashboard)/
```

Rules:

- New SaaS features must be added as **folders**
  (e.g. `/activity`, `/general`)
- `app/(dashboard)/page.tsx` must be updated to surface new features
- `app/(dashboard)/layout.tsx` may be updated **only** to support layout or navigation
- No SaaS UI, logic, or workflows may exist outside `(dashboard)`

---

### Authentication Pages (STRICT)

- **Auth pages must not be changed** unless explicitly requested by the user
- Existing auth structure must be preserved
- No visual, layout, or logic changes by default

Authentication is **stable infrastructure**, not a customization surface.

---

## 🔐 ENVIRONMENT VARIABLES (CONTRACT)

Rules:

- `env.example` is the **single source of truth**
- AI must not invent new environment variables
- All env usage must be validated
- Secrets must never be committed
- UI code must never access env variables directly

---

## 🗄️ DATABASE & PRISMA (CRITICAL ZONE)

- PostgreSQL hosted on Railway
- Prisma ORM is mandatory
- `schema.prisma` is read-only by default
- `prisma/migrations` must never be edited
- UI and templates must never imply schema changes

If a UI requirement suggests a schema change → **STOP AND ESCALATE**

---

## 🔌 API ROUTES & SERVER ACTIONS

Rules:

- Request/response contracts are immutable
- Authentication checks must remain enforced
- Input validation is required (Zod preferred)

AI MAY:
- Refactor logic
- Improve error handling
- Optimize internals

AI MUST NOT:
- Change route signatures
- Break response shapes
- Remove auth
- Introduce side effects

---

## 🔐 AUTHENTICATION & AUTHORIZATION

- Providers are read-only by default
- Session shape is immutable
- Role logic must remain consistent

Forbidden:
- Privilege escalation
- Admin bypasses
- Role inference

---

## 🤖 SCRIPTS DIRECTORY CONTRACT

Scripts are **infrastructure-only**.

**Immutability Rule**

All files inside the `scripts/` directory are **effectively immutable**.  
They must not be modified, extended, or repurposed unless **explicitly approved**.

Scripts must never:
- Contain business logic
- Change schema behavior
- Affect runtime app logic
- Be imported by UI or API code

---

## 🐳 DOCKER CONTRACT

- Base image changes require approval
- Ports must remain consistent
- No secrets baked into images
- No background workers
- No sidecar services

---

## 🧭 ADDITIONAL OPERATIONAL RULES

### Single-Owner File Rule

Each file has **one primary responsibility**.  
Changes must stay within the owning file unless explicitly requested.

---

### No Drive-By Changes

Do not refactor, rename, reformat, or “clean up” unrelated code.  
If it wasn’t requested, it must not be touched.

---

### File Creation Rule

New files or folders may only be created when existing structure cannot support the change.  
Intent must be explicit and documented.

---

### Dashboard Primacy Rule

`(dashboard)` is the product.  
Everything outside it exists to support it.

---

### User Intent Override

When user instructions conflict with existing structure:

- User intent wins
- Violations must be explicitly called out before execution

---

### Visual vs Behavioral Separation

Visual changes must not alter:

- Data flow
- Auth logic
- API behavior
- State ownership

If they do → **STOP AND ASK**

---

### Safe Default Rule

When multiple solutions are possible, choose the:

- Least invasive
- Most explicit
- Most reversible

---

### Uncertainty Rule

If requirements are ambiguous or incomplete → **STOP** and ask for clarification.

---

## 🔐 CHANGE PERMISSION MATRIX

| Change Type       | Default | Explicit |
|------------------|---------|----------|
| Copy / Text      | ✅      | ❌       |
| UI Logic         | ✅      | ❌       |
| API Logic        | ❌      | ✅       |
| Auth             | ❌      | ✅       |
| Prisma Schema    | ❌      | ✅       |
| Migrations       | ❌      | ❌       |
| Scripts Behavior | ❌      | ✅       |
| Env Vars         | ❌      | ✅       |
| Config Files     | ❌      | ✅       |

---

## 🛑 HARD STOP CONDITIONS

STOP immediately if:

- A schema change is implied
- Migration edits are requested
- Auth behavior is unclear
- Scripts require modification
- Multiple interpretations exist

---

## 📦 DEPLOYMENT

Designed for:

- Vercel
- Docker-based platforms
- Managed PostgreSQL providers (Railway, Supabase, Neon)

---

## 📄 LICENSE

Part of the **Panda Template System**.  
Usage may be subject to internal or commercial licensing.

---

## 🐼 FINAL DIRECTIVE

This repository prioritizes:

- Predictability
- Safety
- Longevity
- AI correctness

**Stability > Cleverness**
